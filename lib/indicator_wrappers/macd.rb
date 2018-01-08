module IndicatorWrappers
  class Macd
    def self.get(market_name, tick_interval)
      historical = BittrexProvider::Historical.get(market_name, tick_interval)[-2880..-1].map{ |h| h["C"] }
      indicator = Indicators::Data.new(historical)
      indicator.calc(:type => :macd, :params => [12, 26, 9])
    end
  end
end
