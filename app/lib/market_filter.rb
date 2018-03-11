class MarketFilter
  BTC_24H_CHANGE = 5
  USDT_24H_CHANGE = 2

  def self.indicators(exchange, base, symbol)
    DpxLogger.log_debug("MarketFilter::indicators")

    teller = Tellers::FortuneTeller.new(exchange, base, symbol)
    five_min = teller.five_min_teller
    hour = teller.hour_teller
    day = teller.day_teller
    five_min_history = teller.last_xx_ticks('fiveMin')
    hour_history = teller.last_xx_ticks('hour')
    day_history = teller.last_xx_ticks('day')
    five_min_bb = teller.last_xx_bb('fiveMin')
    hour_bb = teller.last_xx_bb('hour')
    day_bb = teller.last_xx_bb('day')
    order_book = CryptoProvider::FacadeProvider.order_book(exchange, base, symbol)

    DpxLogger.log_brief("MarketFilter::indicators | #{exchange} | #{symbol} | #{base} | done")
    {
      five_min: five_min,
      hour: hour,
      day: day,
      five_min_history: five_min_history,
      hour_history: hour_history,
      day_history: day_history,
      five_min_bb: five_min_bb,
      hour_bb: hour_bb,
      day_bb: day_bb,
      order_book: order_book,
    }
  end

  def self.summary(exchange, btc_change, usdt_change)
    DpxLogger.log_debug("MarketFilter::summary")
    exchange = exchange.present? ? exchange : 'bittrex'
    btc_change = btc_change.present? ? btc_change.to_f : BTC_24H_CHANGE
    usdt_change = usdt_change.present? ? usdt_change.to_f : USDT_24H_CHANGE

    markets = CryptoProvider::FacadeProvider.summary(exchange)
    btc_all = markets.select{|m| m.base == 'BTC' }.sort{|x, y| y.base_volume <=> x.base_volume}
    btc = btc_all[0..btc_all.length/3].select{ | m | m.daily_change >= btc_change }
    usdt_all = markets.select{|m| m.base == 'USDT' }
    usdt = usdt_all.select{ | m | m.daily_change >= usdt_change }

    DpxLogger.log_brief("MarketFilter::summary | #{btc.length} BTC | #{usdt.length} USDT | #{exchange} | BTC: #{btc_change} | USDT: #{usdt_change}")
    { data: (btc + usdt) }
  end

  def self.daily_change(m)
    (m.last - m.previous_day) / m.previous_day
  end
end
