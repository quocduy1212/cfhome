module Sensor
  class Rocket
    def self.check(market_state)
      (market_state.latest_price_change > 1.0 && market_state.latest_volume_change > 50.0) ||
      (market_state.latest_price_change > 2.0 && market_state.latest_volume_change > 0.0)
    end

    def self.get_market_state_string(market_state)
      price = market_state.latest_price_change
      volume = market_state.latest_volume_change
      price = price > 0 ? '+%.2f' % price : '%.2f' % price
      volume = volume > 0 ? '+%.2f' % volume : '%.2f' % volume
      result = "• :rocket: price *#{price}%* volume *#{volume}%* streak *#{market_state.trend_streak}*"
    end
  end
end
