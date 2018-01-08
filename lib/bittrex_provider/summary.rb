module BittrexProvider
  class Summary
    include Helpers

    attr_reader :name, :high, :low, :volume, :last, :base_volume, :raw, :created_at
    attr_reader :bid, :ask, :open_buy_orders, :open_sell_orders, :previous_day, :updated_at

    alias_method :vol, :volume
    alias_method :base_vol, :base_volume

    def initialize(attrs = {})
      @name             = attrs['MarketName']
      @high             = attrs['High']
      @low              = attrs['Low']
      @volume           = attrs['Volume']
      @last             = attrs['Last']
      @base_volume      = attrs['BaseVolume']
      @bid              = attrs['Bid']
      @ask              = attrs['Ask']
      @open_buy_orders  = attrs['OpenBuyOrders']
      @open_sell_orders = attrs['OpenSellOrders']
      @previous_day     = attrs['PrevDay']
      @updated_at       = extract_timestamp(attrs['TimeStamp'])
      @created_at       = extract_timestamp(attrs['Created'])
      @raw              = attrs
    end

    def self.all
      client.get('public/getmarketsummaries').map{|data| new(data) }
    end

    private

    def self.client
      @client ||= BittrexProvider.client
    end
  end
end
