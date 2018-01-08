module Checker
  class TrendUp
    LATEST_TICK_URL = 'https://bittrex.com/Api/v2.0/pub/market/GetTicks?'
    TREND_WEBHOOK = ENV["TREND_WEBHOOK"]

    cattr_accessor :running, :pinned_market_state
    @@running = false
    @@pinned_market_state = {}

    def self.check_all(proccess_name)
      if @@running
        'is already running, skip this scheduler trigger'
      else
        @@running = true
        markets = BittrexProvider::Summary.all
        btc_all = markets.select{|m| m.name.start_with?('BTC-') }.sort{|x, y| y.base_volume <=> x.base_volume}
        btc = btc_all[0..btc_all.length/3]
        usdt = markets.select{|m| m.name.start_with?('USDT-') }.sort{|x, y| y.base_volume <=> x.base_volume}

        usdt.each_with_index{|m, i| TrendUp.check(m.name, 'fiveMin', i + 1, usdt.length) }
        puts "#{Time.now}: #{proccess_name} checked #{usdt.length} USDT markets"
        btc.each_with_index{|m, i| TrendUp.check(m.name, 'fiveMin', i + 1, btc.length) }
        puts "#{Time.now}: #{proccess_name} checked #{btc.length} BTC markets"

        @@running = false
        "markets check successfully"
      end
    end

    def self.check(market_name, interval = 'fiveMin', i = 0, n = 0)
      last_24h_ticks = BittrexProvider::Historical.get(market_name, interval)[-50..-1]
      market_state = BittrexProvider::Model::MarketState.new(market_name)
      last_24h_ticks.each{|t| market_state.add_tick(t) }

      if Sensor::MACD.check(market_state)
        msg = ''
        if Sensor::BollingerBands.check(market_state)
          msg += Sensor::BollingerBands.get_market_state_string(market_state)
          msg += "\n"
          if Sensor::Rocket.check(market_state)
            msg += Sensor::Rocket.get_market_state_string(market_state)
            msg += "\n"
          end
        end
        if msg.present?
          tmp = @@pinned_market_state[market_name] || 0
          tmp += 1
          @@pinned_market_state[market_name] = tmp
          prays = ''
          if tmp > 1
            tmp.times{prays += ':pray:' }
          end
          position = ''
          if (i > 0 && n > 0)
            position = "`#{i}/#{n}`"
          end
          msg += "\n`#{market_state.last_10_ticks.last.timestamp}`"
          msg += "\n>`#{market_state.get_recent_ticks_string.join("`\n>`")}`"
          con = Faraday.new(:url => TREND_WEBHOOK)
          response = con.post do |req|
            req.headers['Content-Type'] = 'application/json'
            req.body = "{ 'text': '*#{market_name}* #{position} #{prays} \n#{msg}'}"
          end
        else
          @@pinned_market_state[market_name] = 0
        end
      end
      market_state
    end
  end
end
