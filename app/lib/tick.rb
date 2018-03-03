class Tick
  attr_reader :low, :high, :close, :open, :volume, :base_volume
  def initialize(attrs = {})
    @low = attrs['L'].to_f || 0
    @high = attrs['H'].to_f || 0
    @close = attrs['C'].to_f || 0
    @open = attrs['O'].to_f || 0
    @volume = attrs['V'].to_f || 0
    @base_volume = attrs['BV'].to_f || 0
  end
end
