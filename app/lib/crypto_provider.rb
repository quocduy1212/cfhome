class CryptoProvider
  BINANCE_INTEVALS = {
    'fiveMin' => '5m',
    'hour' => '1h',
    'day' => '1d'
  }
  BITTREX = 'bittrex'
  BINANCE = 'binance'
  EXCHANGE_LIST = [BITTREX,BINANCE]
  def self.summary(exchange)
    begin
      if exchange == 'bittrex'
        CryptoProvider.summary_bittrex
      elsif exchange == 'binance'
        CryptoProvider.summary_binance
      elsif exchange == 'all'
        bittrexMarkets = CryptoProvider.summary_bittrex
        binanceMarkets = CryptoProvider.summary_binance
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
      if (exchange == 'bittrex')
        BittrexProvider::Historical.get([base, symbol].join('-'), interval)
      elsif exchange == 'binance'
        ticks = BinanceProvider::Client::REST.new.klines({
          symbol: [symbol, base].join(''),
          interval: BINANCE_INTEVALS[interval]
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
      else
        []
      end
    rescue StandardError => ex
      DpxLogger.log_exception(ex)
      []
    end
  end
  def self.summary_bittrex
    markets = BittrexProvider::Summary.all
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
    markets = BinanceProvider::Client::REST.new.twenty_four_hour({})
    markets.map{|m| MarketSummary.new({
      exchange: BINANCE,
      base: CryptoProvider.resolve_binance_symbol(m['symbol'])[:base],
      symbol: CryptoProvider.resolve_binance_symbol(m['symbol'])[:symbol],
      daily_change: m['priceChangePercent'],
      volume: m['volume'],
      base_volume: m['quoteVolume']
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
