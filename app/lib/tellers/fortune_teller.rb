module Tellers
  class FortuneTeller
    HISTORY_MAX_TICKS = 100
    XX_TICKS = 50
    HISTORY_PERCENTAGE_CHANGE = 6

    attr_reader :base, :symbol, :history, :bb

    def initialize(exchange, base, symbol)
      @exchange = exchange
      @base = base
      @symbol = symbol
      @history = {}
      @bb = {}
    end

    def five_min_teller
      begin
        load_history
        calc_bb_indicator
        bb = on_bb_upper
        up = on_up_trend
        hc = recent_history_percentage_change
        { bb: bb, up: up, hc: hc }
      rescue StandardError => ex
        DpxLogger.log_exception(ex)
        { bb: 0, up: 0, hc: [] }
      end
    end

    def hour_teller
      begin
        load_history('hour')
        calc_bb_indicator('hour')
        bb = on_bb_upper('hour')
        up = on_up_trend('hour')
        hc = recent_history_percentage_change('hour')
        { bb: bb, up: up, hc: hc }
      rescue StandardError => ex
        DpxLogger.log_exception(ex)
        { bb: 0, up: 0, hc: [] }
      end
    end

    def day_teller
      begin
        load_history('day')
        calc_bb_indicator('day')
        bb = on_bb_upper('day')
        up = on_up_trend('day')
        hc = recent_history_percentage_change('day')
        { bb: bb, up: up, hc: hc }
      rescue StandardError => ex
        DpxLogger.log_exception(ex)
        { bb: 0, up: 0, hc: [] }
      end
    end

    def load_history(interval = 'fiveMin')
      history = CryptoProvider::FacadeProvider.history(@exchange, @base, @symbol, interval)
      max_ticks = history.length > HISTORY_MAX_TICKS ? HISTORY_MAX_TICKS : history.length
      @history[interval] = history[(max_ticks * -1)..-1]
    end

    def calc_bb_indicator(interval = 'fiveMin')
      if (@history[interval].length > 20)
        bb_data = Indicators::Data.new(@history[interval].map{ |t| t.close })
        @bb[interval] = bb_data.calc(:type => :bb, :params => [20,2]).output
      else
        @bb[interval] = []
      end
    end

    def on_bb_upper(interval = 'fiveMin')
      reversed_bb = []
      reversed_history = []
      i = 0
      above_upper = 0
      above_middle = 0

      reversed_bb = @bb[interval].reverse
      reversed_history = @history[interval].reverse
      if reversed_bb.length > 0
        while reversed_bb[i] && reversed_history[i].open >= reversed_bb[i][1] || reversed_history[i].close >= reversed_bb[i][1] do
          above_upper = above_upper + 1
          i = i + 1
        end
        i = 0
        while reversed_bb[i] && reversed_history[i].open >= reversed_bb[i][0] && reversed_history[i].close >= reversed_bb[i][0] do
          above_middle = above_middle + 1
          i = i + 1
        end
      end

      {
        upper: above_upper,
        middle: above_middle,
      }
    end

    def on_up_trend(interval = 'fiveMin')
      reversed_history = []
      i = 0
      times = 0

      reversed_history = @history[interval].reverse
      while i < reversed_history.length - 1 && reversed_history[i].close >= reversed_history[i + 1].close do
        times = times + 1
        i = i + 1
      end

      times
    end

    def last_xx_ticks(interval = 'fiveMin')
      history = @history[interval]
      max_ticks = history.length > XX_TICKS ? XX_TICKS : history.length
      history[(max_ticks * -1)..-1]
    end

    def last_xx_bb(interval = 'fiveMin')
      bb = @bb[interval]
      max_ticks = bb.length > XX_TICKS ? XX_TICKS : bb.length
      bb[(max_ticks * -1)..-1]
    end

    def recent_history_percentage_change(interval = 'fiveMin')
      result = []
      history = @history[interval]
      max_ticks = history.length > HISTORY_PERCENTAGE_CHANGE ? HISTORY_PERCENTAGE_CHANGE : history.length
      history = history[(max_ticks * -1)..-1]
      history.each_with_index do | t, i |
        if (i < history.length - 1)
          future = history[i+1]
          result.push(((future.close - t.close) / t.close) * 100)
        end
      end
      result
    end
  end
end
