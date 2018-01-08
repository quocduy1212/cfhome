require 'faraday'
require 'base64'
require 'json'

module BittrexProvider
  class Historical
    HOST = 'https://bittrex.com/Api/v2.0/pub/market/GetTicks?'

    def self.get(market_name, tick_interval)
      nonce = Time.now.to_i
      connection = Faraday.new(:url => HOST + "marketName=#{market_name}&tickInterval=#{tick_interval}&_=#{nonce}")
      response = connection.get
      JSON.parse(response.body)['result'].map{|t| Model::Tick.new(t)}
    end
  end
end
