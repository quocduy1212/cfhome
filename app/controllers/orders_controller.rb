class OrdersController < ApplicationController
  def index
    @orders = Bittrex::Order.open.sort { | a, b | b.opened_at <=> a.opened_at }
    @history = Bittrex::Order.history
    @perks = {}
    @quotes = {}
    @orders.each do | order |
      buy = @history.detect{ | h | h.exchange == order.exchange && (h.quantity - order.quantity).abs < 0.000001 && h.type == 'Limit_buy' }
      unless @quotes[order.exchange]
        @quotes[order.exchange] = Bittrex::Quote.current(order.exchange)
      end
      quote = @quotes[order.exchange]
      delta = buy ? ((quote.ask - buy.limit) / buy.limit * 100).round(2) : 0
      @perks[order.id] = {
        ask: '%.8f' % quote.ask,
        buy: buy && '%.8f' % buy.limit,
        delta_percentage: delta > 0 ? '(+%.2f%%)' % delta : '(%.2f%%)' % delta,
        delta: delta
      }
    end
  end
end
