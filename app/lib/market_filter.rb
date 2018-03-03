class MarketFilter
  BTC_24H_CHANGE = 0.05
  USDT_24H_CHANGE = 0.02

  def self.indicators(market_name)
    DpxLogger.log_debug("MarketFilter::indicators")

    teller = Tellers::FortuneTeller.new(market_name)
    five_min = teller.five_min_teller
    hour = teller.hour_teller
    day = teller.day_teller
    five_min_history = teller.history
    hour_history = teller.history('hour')
    day_history = teller.history('day')

    DpxLogger.log_brief("MarketFilter::indicators | #{market_name} | done")
    {
      five_min: five_min,
      hour: hour,
      day: day,
      five_min_history: five_min_history,
      hour_history: hour_history,
      day_history: day_history,
    }
  end

  def self.bb
    DpxLogger.log_debug("MarketFilter")

    markets = BittrexProvider::Summary.all
    btc_all = markets.select{|m| m.name.start_with?('BTC-') }.sort{|x, y| y.base_volume <=> x.base_volume}
    btc = btc_all[0..btc_all.length/3].select{ | m | MarketFilter.daily_change(m) >= BTC_24H_CHANGE }
    usdt_all = markets.select{|m| m.name.start_with?('USDT-') }
    usdt = usdt_all.select{ | m | MarketFilter.daily_change(m) >= USDT_24H_CHANGE }

    DpxLogger.log_brief("MarketFilter | #{btc.length} BTC | #{usdt.length} USDT")
    data = []
    (btc + usdt).each do |m|
      teller = Tellers::FortuneTeller.new(m.name)
      five_min = teller.five_min_teller
      hour = teller.hour_teller
      day = teller.day_teller

      if (five_min[:bb] > 0 || hour[:bb] > 0 || day[:bb] > 0)
        DpxLogger.log_brief("MarketFilter | #{m.name} | on BB")
        data.push({
          daily_change: MarketFilter.daily_change(m),
          name: m.name,
          five_min: five_min,
          hour: hour,
          day: day
        })
      end
    end
    { data: data }
  end


  def self.summary(exchange, btc_change, usdt_change)
    DpxLogger.log_debug("MarketFilter::summary")
    exchange = exchange.present? ? exchange : 'bittrex'
    btc_change = btc_change.present? ? btc_change.to_f : BTC_24H_CHANGE
    usdt_change = usdt_change.present? ? usdt_change.to_f : USDT_24H_CHANGE

    markets = BittrexProvider::Summary.all
    btc_all = markets.select{|m| m.name.start_with?('BTC-') }.sort{|x, y| y.base_volume <=> x.base_volume}
    btc = btc_all[0..btc_all.length/3].select{ | m | MarketFilter.daily_change(m) >= btc_change }
    usdt_all = markets.select{|m| m.name.start_with?('USDT-') }
    usdt = usdt_all.select{ | m | MarketFilter.daily_change(m) >= usdt_change }

    DpxLogger.log_brief("MarketFilter::summary | #{btc.length} BTC | #{usdt.length} USDT | #{exchange} | BTC: #{btc_change} | USDT: #{usdt_change}")
    result = (btc + usdt).map{|m| { name: m.name, daily_change: MarketFilter.daily_change(m), volumn: m.base_volume } }
    { data: result }
  end

  def self.daily_change(m)
    (m.last - m.previous_day) / m.previous_day
  end
end
