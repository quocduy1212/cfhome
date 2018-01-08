module Sensor
  class MACD
    def self.check(market_state)
      last_50_close_price_changes = market_state.last_10_ticks[-50..-1].map{|t| t.close }
      macd_data = Indicators::Data.new(last_50_close_price_changes)
      macd = macd_data.calc(:type => :macd, :params => [12, 26, 9])

      macd_histogram = macd.output.last.last
      macd_histogram >= 0
    end
  end
end
