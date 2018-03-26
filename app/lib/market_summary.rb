class MarketSummary
  attr_reader :exchange, :name, :base, :symbol, :daily_change, :volume, :base_volume, :details

  def initialize(attrs = {})
    @exchange = attrs[:exchange]
    @base = attrs[:base]
    @symbol = attrs[:symbol]
    @daily_change = attrs[:daily_change].to_f
    @volume = attrs[:volume].to_f
    @base_volume = attrs[:base_volume].to_f
    @name = [@symbol, @base].join('')
    @details = {}
  end

  def add_details(details)
    @details = details
  end
end
