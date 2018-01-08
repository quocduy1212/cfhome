module BittrexProvider::Model
  class Tick
    attr_reader :low, :high, :close, :open, :timestamp, :volume, :base_volume, :average_price, :price_change, :volume_change
    def initialize(attrs = {})
      @low = attrs['L'] || 0
      @high = attrs['H'] || 0
      @close = attrs['C'] || 0
      @open = attrs['O'] || 0
      @timestamp = attrs['T'] || ''
      @volume = attrs['V'] || 0
      @base_volume = attrs['BV'] || 0
      @average_price = (@open + @close) / 2
      @price_change = 0.0
      @volumn_change = 0.0
    end

    def calc_diff_from_tick(tick)
      price_diff = (@close - tick.close) * 1.0
      @price_change = ((price_diff / tick.close) * 100).round(2)
      volume_diff = (@volume - tick.volume) * 1.0
      @volumn_change = ((volume_diff / tick.volume) * 100).round(2)
    end

    def to_s_price_volume
      pc = @price_change > 0 ? '+%.2f' % @price_change : '%.2f' % @price_change
      vc = @volumn_change > 0 ? '+%.2f' % @volumn_change : '%.2f' % @volumn_change
      "#{'%.8f' % @close}(#{pc}%), #{'%.8f' % @volume}(#{vc}%)"
    end
  end
end
