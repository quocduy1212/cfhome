module BittrexProvider
  class Wallet
    attr_reader :id, :currency, :balance, :available, :pending, :address, :requested, :raw

    def initialize(attrs = {})
      @id = attrs['Uuid'].to_s
      @address = attrs['CryptoAddress']
      @currency = attrs['Currency']
      @balance = attrs['Balance']
      @available = attrs['Available']
      @pending = attrs['Pending']
      @raw = attrs
      @requested = attrs['Requested']
    end

    def self.all
      client.get('account/getbalances').map{|data| new(data) }
    end

    private

    def self.client
      @client ||= BittrexProvider.client
    end
  end
end
