module CryptoProvider
  class FacadeProvider
    BINANCE_INTEVALS = {
      'fiveMin' => '5m',
      'hour' => '1h',
      'day' => '1d'
    }
    BITTREX = 'bittrex'
    BINANCE = 'binance'
    POLONIEX = 'poloniex'
    EXCHANGE_LIST = [BITTREX,BINANCE, POLONIEX]
    def self.order_book(exchange, base, symbol)
      begin
        if exchange == BITTREX
          FacadeProvider.order_book_bittrex(symbol, base)
        elsif exchange == BINANCE
          FacadeProvider.order_book_binance(symbol, base)
        elsif exchange == POLONIEX
          { buy: [], sell: [] }
        else
          { buy: [], sell: [] }
        end
      rescue StandardError => ex
        DpxLogger.log_exception(ex)
        { buy: [], sell: [] }
      end
    end
    def self.summary(exchange)
      begin
        if exchange == BITTREX
          FacadeProvider.summary_bittrex
        elsif exchange == BINANCE
          FacadeProvider.summary_binance
        elsif exchange == POLONIEX
          FacadeProvider.summary_poloniex
        elsif exchange == 'all'
          bittrexMarkets = FacadeProvider.summary_bittrex
          binanceMarkets = FacadeProvider.summary_binance
          # poloniexMarkets = FacadeProvider.summary_poloniex
          (bittrexMarkets + binanceMarkets)
        else
          []
        end
      rescue StandardError => ex
        DpxLogger.log_exception(ex)
        []
      end
    end

    def self.history(exchange, base, symbol, interval)
      begin
        if (exchange == BITTREX)
          CryptoProvider::Bittrex::Historical.get([base, symbol].join('-'), interval)
        elsif exchange == BINANCE
          ticks = CryptoProvider::Binance::Client::REST.new.klines({
            symbol: [symbol, base].join(''),
            interval: BINANCE_INTEVALS[interval],
            limit: 100
          })
          ticks.map do | t |
            # [
            # [
            # 1499040000000,      // Open time
            # "0.01634790",       // Open
            # "0.80000000",       // High
            # "0.01575800",       // Low
            # "0.01577100",       // Close
            # "148976.11427815",  // Volume
            # 1499644799999,      // Close time
            # "2434.19055334",    // Quote asset volume
            # 308,                // Number of trades
            # "1756.87402397",    // Taker buy base asset volume
            # "28.46694368",      // Taker buy quote asset volume
            # "17928899.62484339" // Ignore
            # ]
            # ]
            tmp = {}
            tmp['O'] = t[1]
            tmp['H'] = t[2]
            tmp['L'] = t[3]
            tmp['C'] = t[4]
            tmp['V'] = t[5]
            tmp['BV'] = t[7]
            Tick.new(tmp)
          end
        elsif exchange == POLONIEX
          response = {}
          if (interval == 'day')
            response = CryptoProvider::Poloniex::Client.get_day_ticks([base, symbol].join('_'))
          elsif interval == 'hour'
            response = CryptoProvider::Poloniex::Client.get_half_hour_ticks([base, symbol].join('_'))
          elsif interval == 'fiveMin'
            response = CryptoProvider::Poloniex::Client.get_five_min_ticks([base, symbol].join('_'))
          end
          ticks = JSON.parse(response.body)
          ticks.map do | t |
            tmp = {}
            tmp['O'] = t['open']
            tmp['H'] = t['high']
            tmp['L'] = t['low']
            tmp['C'] = t['close']
            tmp['V'] = t['quoteVolume']
            tmp['BV'] = t['volume']
            Tick.new(tmp)
          end
        else
          []
        end
      rescue StandardError => ex
        DpxLogger.log_exception(ex)
        []
      end
    end
    def self.order_book_binance(symbol, base, limit = 50)
      book = OrderBook.new
      result = CryptoProvider::Binance::Client::REST.new.depth({ symbol: [symbol, base].join(''), limit: limit })
      buy = result['bids'] || []
      sell = result['asks'] || []
      buy.each{| b | book.add_buy(b[1], b[0])}
      sell.each{| b | book.add_sell(b[1], b[0])}
      {
        buy: book.buy,
        sell: book.sell
      }
    end
    def self.order_book_bittrex(symbol, base, limit = 50)
      book = OrderBook.new
      result = CryptoProvider::Bittrex::Order.orderbook([base, symbol].join('-'), 'both', limit)
      buy = result['buy'] || []
      sell = result['sell'] || []
      buy.each{| b | book.add_buy(b['Quantity'], b['Rate'])}
      sell.each{| b | book.add_sell(b['Quantity'], b['Rate'])}
      {
        buy: book.buy,
        sell: book.sell
      }
    end
    def self.summary_bittrex
      markets = CryptoProvider::Bittrex::Summary.all
      markets.map{|m| MarketSummary.new({
        exchange: BITTREX,
        base: m.name.split('-')[0],
        symbol: m.name.split('-')[1],
        daily_change: ((m.last - m.previous_day) / m.previous_day) * 100,
        volume: m.volume,
        base_volume: m.base_volume
      })}
    end
    def self.summary_binance
      markets = CryptoProvider::Binance::Client::REST.new.twenty_four_hour({})
      markets.map{|m| MarketSummary.new({
        exchange: BINANCE,
        base: FacadeProvider.resolve_binance_symbol(m['symbol'])[:base],
        symbol: FacadeProvider.resolve_binance_symbol(m['symbol'])[:symbol],
        daily_change: m['priceChangePercent'],
        volume: m['volume'],
        base_volume: m['quoteVolume']
      })}
    end
    def self.summary_poloniex
      markets = []
      response = CryptoProvider::Poloniex::Client.ticker
      result = JSON.parse(response.body)
      result.each{|key, value| markets.push(value.merge({ 'symbol' => key }))}
      markets.map{|m| MarketSummary.new({
        exchange: POLONIEX,
        base: m['symbol'].split('_')[0],
        symbol: m['symbol'].split('_')[1],
        daily_change: m['percentChange'].to_f * 100,
        volume: m['quoteVolume'],
        base_volume: m['baseVolume']
      })}
    end
    def self.resolve_binance_symbol(symbol)
      if symbol.end_with?('BTC')
        { base: 'BTC', symbol: symbol.split('BTC')[0] }
      elsif symbol.end_with?('USDT')
        { base: 'USDT', symbol: symbol.split('USDT')[0] }
      elsif symbol.end_with?('ETH')
        { base: 'ETH', symbol: symbol.split('ETH')[0] }
      else
        { base: 'SKIPPED', symbol: symbol }
      end
    end
  end
end
