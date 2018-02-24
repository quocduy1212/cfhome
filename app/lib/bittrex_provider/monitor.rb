module BittrexProvider
  class Monitor
    LATEST_TICK_URL = 'https://bittrex.com/Api/v2.0/pub/market/GetLatestTick?'
    TREND_WEBHOOK = ENV["TREND_WEBHOOK"]
    SAMPLE_MARKET = 'USDT-BTC'

    cattr_accessor :current_market_tick, :market_state, :running
    @@current_market_tick = ''
    @@market_state = {}
    @@running = false


    def self.new_market_tick_available?
      tick = Monitor.get_latest_tick(SAMPLE_MARKET)
      old = @@current_market_tick
      @@current_market_tick = tick
      !old.present? || @@current_market_tick.timestamp != old.timestamp
    end

    def self.monitor_all
      if @@running
        'is already running, skip this scheduler trigger'
      else
        @@running = true
        result = ''
        if Monitor.new_market_tick_available?
          markets = BittrexProvider::Market.all.select{|m| m.active }
          markets.each do |m|
            Monitor.monitor(m.name)
          end
          result = "checked #{markets.length} markets successfully"
        else
          result = "no new market ticks, wait for next schedule"
        end
        @@running = false
        result
      end
    end

    def self.monitor(market_name)
      @@market_state[market_name] = calc_market_state(market_name)
      if Sensor::Rocket.check(@@market_state[market_name])
        tmp = Sensor::Rocket.get_market_state_string(@@market_state[market_name])
        con = Faraday.new(:url => TREND_WEBHOOK)
        response = con.post do |req|
          req.headers['Content-Type'] = 'application/json'
          req.body = "{ 'text': '#{tmp}'}"
        end
      end
    end

    def self.calc_market_state(market_name)
      cur_market = @@market_state[market_name]
      if  cur_market.blank?
        cur_market = Model::MarketState.new(market_name)
      end

      cur_market.add_tick(Monitor.get_latest_tick(market_name))
      cur_market
    end

    def self.get_latest_tick(market_name, tick_interval = 'fiveMin')
      nonce = Time.now.to_i
      connection = Faraday.new(:url => LATEST_TICK_URL + "marketName=#{market_name}&tickInterval=#{tick_interval}&_=#{nonce}")
      response = connection.get
      Model::Tick.new(JSON.parse(response.body)['result'][0])
    end

    def self.latest_tick
      puts Monitor.get_latest_tick('BTC-OMG').timestamp
    end

    def self.slack
      market_state = Model::MarketState.new('BTC-OMG')
      tick = Model::Tick.new({})
      tick2 = Model::Tick.new({})
      market_state.last_10_ticks.push(tick)
      market_state.last_10_ticks.push(tick2)
      tmp = Sensor::Rocket.get_market_state_string(market_state)
      con = Faraday.new(:url => TREND_WEBHOOK)
      response = con.post do |req|
        req.headers['Content-Type'] = 'application/json'
        req.body = "{ 'text': '#{tmp}'}"
      end
    end
  end
end
