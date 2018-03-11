class UserDecorator < Draper::Decorator
  delegate :id, :name, :email
end
