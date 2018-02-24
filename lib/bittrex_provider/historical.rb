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
			body = JSON.parse(response.body)['result']
			puts("get historical for #{market_name} status code: #{response.status}, body length: #{body.present? ? body.length : -1}")
			body.present? ? body.map{|t| Model::Tick.new(t)} : []
    end
  end
end
