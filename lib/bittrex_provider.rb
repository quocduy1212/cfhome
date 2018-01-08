require "bittrex_provider/version"

module BittrexProvider
  autoload :Helpers,       'bittrex_provider/helpers'
  autoload :Market,        'bittrex_provider/market'
  autoload :Client,        'bittrex_provider/client'
  autoload :Configuration, 'bittrex_provider/configuration'
  autoload :Currency,      'bittrex_provider/currency'
  autoload :Deposit,       'bittrex_provider/deposit'
  autoload :Order,         'bittrex_provider/order'
  autoload :Quote,         'bittrex_provider/quote'
  autoload :Summary,       'bittrex_provider/summary'
  autoload :Wallet,        'bittrex_provider/wallet'
  autoload :Withdrawal,    'bittrex_provider/withdrawal'

  def self.client
    @client ||= Client.new(configuration.auth)
  end

  def self.config
    @client = Client.new(configuration.auth)
  end

  def self.configuration
    Configuration.instance
  end

  def self.root
    File.expand_path('../..', __FILE__)
  end
end
