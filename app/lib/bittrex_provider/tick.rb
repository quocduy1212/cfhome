module BittrexProvider
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
  end
end
