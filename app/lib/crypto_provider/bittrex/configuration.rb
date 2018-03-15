require 'singleton'

module CryptoProvider
  module Bittrex
    class Configuration
      include Singleton

      attr_accessor :key, :secret

      def initialize
        @key = ''
        @secret = ''
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
