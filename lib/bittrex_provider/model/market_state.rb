module BittrexProvider::Model
  class MarketState
    attr_reader :trend, :trend_streak, :last_10_ticks, :latest_price_change, :latest_volume_change, :market_name
    def initialize(market_name)
      @market_name = market_name || ''
      @trend = ''
      @latest_price_change = 0
      @latest_volume_change = 0
      @trend_streak = 0
      @last_10_ticks = []
    end

    def add_tick(tick)
      prev_tick = @last_10_ticks[-1]
      if prev_tick.blank?
        last_10_ticks.push(tick)
      elsif prev_tick.timestamp != tick.timestamp
        if prev_tick.close <= tick.close
          trend_up!
        else
          trend_down!
        end
        calc_price_change(prev_tick, tick)
        calc_volume_change(prev_tick, tick)
        tick.calc_diff_from_tick(prev_tick)
        @last_10_ticks.push(tick)
      end
    end

    def calc_price_change(prev_tick, current_tick)
      spread = (current_tick.close - prev_tick.close) * 1.0
      @latest_price_change = ((spread / prev_tick.close) * 100).round(2)
    end
    def calc_volume_change(prev_tick, current_tick)
      spread = (current_tick.volume - prev_tick.volume) * 1.0
      @latest_volume_change = ((spread / prev_tick.volume) * 100).round(2)
    end
    def trend_down?
      @trend == 'down'
    end
    def trend_up?
      # trend can also be ''
      @trend == 'up'
    end
    def trend_down!
      if trend_up?
        @trend_streak = 0
      else
        @trend_streak += 1
      end
      @trend = 'down'
    end
    def trend_up!
      if trend_down?
        @trend_streak = 0
      else
        @trend_streak += 1
      end
      @trend = 'up'
    end
    def get_recent_ticks_string
      @last_10_ticks.reverse.map{|t| t.to_s_price_volume}[0...5]
    end
  end
end
