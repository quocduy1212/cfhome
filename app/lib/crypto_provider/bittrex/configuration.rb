require 'singleton'

module CryptoProvider
  module Bittrex
    class Configuration
      include Singleton

      attr_accessor :key, :secret

      def initialize
        @key = Rails.application.secrets.bittrex_key
        @secret = Rails.application.secrets.bittrex_secret
      end

      def auth
        {
          key: @key,
          secret: @secret
        }
      end
    end
  end
end
