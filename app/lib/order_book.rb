class OrderBook
  attr_reader :buy, :sell

  def initialize
    @buy = []
    @sell = []
  end

  def add_buy(quantity, price)
    @buy.push({ quantity: quantity.to_f, price: price.to_f })
  end

  def add_sell(quantity, price)
    @sell.push({ quantity: quantity.to_f, price: price.to_f })
  end
end
