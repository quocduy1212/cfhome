require 'date'

module BittrexProvider
  module Helpers
    def extract_timestamp(value)
      return if value.nil? or value.strip.empty?
      DateTime.parse value
    end
  end
end
