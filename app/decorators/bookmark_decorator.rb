class BookmarkDecorator < Draper::Decorator
  delegate :id, :name, :base, :symbol, :exchange, :note
end
