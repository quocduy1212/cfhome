class MarketFilter
  BTC_24H_CHANGE = 5
  USDT_24H_CHANGE = 2

  def self.indicators(exchange, base, symbol)
    DpxLogger.log_debug("MarketFilter::indicators")

    teller = Tellers::FortuneTeller.new(exchange, base, symbol)

    five_min = teller.five_min_teller
    hour = teller.hour_teller
    day = teller.day_teller

    five_min_history = teller.history['fiveMin']
    hour_history = teller.history['hour']
    day_history = teller.history['day']

    five_min_bb = teller.bb['fiveMin']
    hour_bb = teller.bb['hour']
    day_bb = teller.bb['day']

    five_min_sto = teller.sto['fiveMin']
    hour_sto = teller.sto['hour']
    day_sto = teller.sto['day']

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
      five_min_sto: five_min_sto,
      hour_sto: hour_sto,
      day_sto: day_sto,
      order_book: order_book,
      inspected_at: Time.now.to_i
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
    (btc + usdt)
  end

  def self.volume
    DpxLogger.log_debug("MarketFilter::volume")

    markets = CryptoProvider::FacadeProvider.summary('all')
    btc_all = markets.select{|m| m.base == 'BTC' }.sort{|x, y| y.base_volume <=> x.base_volume}
    btc = btc_all[0..btc_all.length/3]
    # btc = btc_all[0..3]
    btc.each_with_index do |m, index|
      DpxLogger.log_brief("MarketFilter::volume | #{index}/#{btc.length} | #{m.exchange} | #{m.name}")
      teller = Tellers::FortuneTeller.new(m.exchange, m.base, m.symbol)
      teller.load_history('day')
      m.add_details({
        day_history: teller.history['day'],
        inspected_at: Time.now.to_i
      })
    end

    DpxLogger.log_brief("MarketFilter::volume | #{btc.length} BTC")
    btc
  end
end
