require 'faraday'
require 'base64'
require 'json'

module CryptoProvider
  module Bittrex
    class Historical
      HOST = 'https://bittrex.com/Api/v2.0/pub/market/GetTicks?'

      def self.get(market_name, tick_interval)
        DpxLogger.log_debug("#{market_name} | Historical.get | interval=#{tick_interval}")

        nonce = Time.now.to_i
        connection = Faraday.new(:url => HOST + "marketName=#{market_name}&tickInterval=#{tick_interval}&_=#{nonce}")
        response = connection.get
        body = JSON.parse(response.body)['result']
        result = body.present? ? body.map{|t| Tick.new(t)} : []

        DpxLogger.log_debug("#{market_name} | Historical.get | #{response.status} | #{body.present? ? body.length : -1} ticks")
        if (response.status != 200)
          DpxLogger.log_brief("#{market_name} | Historical.get | #{response.status} | FAILED")
        end
        result
      end
    end
  end
end
