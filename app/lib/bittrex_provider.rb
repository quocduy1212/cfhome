module BittrexProvider
  def self.client
    @client ||= Client.new(configuration.auth)
  end

  def self.config
    @client = Client.new(configuration.auth)
  end

  def self.configuration
    Configuration.instance
  end
end
