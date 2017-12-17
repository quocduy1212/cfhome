class OrdersController < ApplicationController
  def index
    @orders = Bittrex::Order.open
    @quotes = {}
    @orders.each do | order |
      @quotes[order.exchange] = Bittrex::Quote.current(order.exchange)
    end
  end
end
