class OrdersController < ApplicationController
  def index
    @orders = Bittrex::Order.open
  end
end
