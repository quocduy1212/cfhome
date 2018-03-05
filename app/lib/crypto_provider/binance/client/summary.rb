module CryptoProvider
  module Binance
    module Client
      class Summary
        def self.all
          BinanceProvider::Client::REST.new.twenty_four_hour({})
        end
      end
    end
  end
end
