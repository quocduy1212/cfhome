module Sensor
  class BollingerBands
    def self.check(market_state)
      last_25_close_price_changes = market_state.last_10_ticks[-25..-1].map{|t| t.close }
      bb_data = Indicators::Data.new(last_25_close_price_changes)
      bb = bb_data.calc(:type => :bb, :params => [20,2])

      upper_band = bb.output[-1][1]
      last_tick = market_state.last_10_ticks.last
      (last_tick.open >= upper_band || last_tick.close >= upper_band)
    end

    def self.get_market_state_string(market_state)
      '• on *BB* upper band'
    end
  end
end
