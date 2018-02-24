module BittrexProvider::Model
  class MarketStateSpec
    def self.test_add_tick
      ms = MarketState.new
      tick = Tick.new({
        "O" => 10,
        "C" => 20,
        "T" => '2017-12-31T03:45:00'
      })
      ms.add_tick(tick)
      result = ''
      if (ms.last_10_ticks.length != 1)
        result = "last 10 ticks should contain 1 tick\n"
      elsif (ms.trend != '-' || ms.latest_price_change != 0 || ms.trend_streak != 0)
        result += "trend, spread, streak should not be changed\n"
      else
        result = 'ok'
      end
    end
    def self.test_add_ticks
      ms = MarketState.new
      tick1 = Tick.new({
        "O" => 10,
        "C" => 20,
        "T" => '2017-12-31T03:45:00',
        "V" => 10
      })
      tick2 = Tick.new({
        "O" => 20,
        "C" => 30,
        "V" => 20,
        "T" => '2017-12-31T03:46:00'
      })
      ms.add_tick(tick1)
      ms.add_tick(tick2)
      result = ''
      if (ms.last_10_ticks.length != 2)
        result = "last 10 ticks should contain 2 tick\n"
      elsif (ms.trend != 'up')
        result += "trend must be up\n"
      elsif (ms.trend_streak != 1)
        result += "trend_streak must be 1\n"
      elsif (ms.latest_price_change != (10/0.15).round(2))
        result += "latest price change must be #{(10/0.15).round(2)}"
      elsif (ms.latest_volume_change != (10/0.10).round(2))
        result += "latest volume change must be #{(10/0.10).round(2)}"
      else
        result = 'ok'
      end
    end
    def self.test_add_ticks2
      ms = MarketState.new
      tick1 = Tick.new({
        "O" => 10,
        "C" => 20,
        "V" => 10,
        "T" => '2017-12-31T03:45:00'
      })
      tick2 = Tick.new({
        "O" => 20,
        "C" => 30,
        "V" => 20,
        "T" => '2017-12-31T03:46:00'
      })
      ms.add_tick(tick2)
      ms.add_tick(tick1)
      result = ''
      if (ms.last_10_ticks.length != 2)
        result = "last 10 ticks should contain 2 tick\n"
      elsif (ms.trend != 'down')
        result += "trend must be down\n"
      elsif (ms.trend_streak != 1)
        result += "trend_streak must be 1\n"
      elsif (ms.latest_price_change != (-10/0.25).round(2))
        result += "latest price change must be #{(-10/0.25).round(2)}"
      elsif (ms.latest_volume_change != -50.0)
        result += "latest volume change must be -50.0"
      else
        result = 'ok'
      end
    end
  end
end
