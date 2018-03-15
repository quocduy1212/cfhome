class Api::UsersController < ApplicationController
  def hello
    @current_user = User.find_by_email(params[:email])
    if @current_user.present?
      result = @current_user.decorate.as_json
      result['bookmarks'] = @current_user.bookmarks.decorate.as_json
      result['validated'] = true
      result['markets'] = CryptoProvider::FacadeProvider.summary('all').select{|m| ['BTC', 'USDT'].include?(m.base)}
      render json: { data: result }, status: :ok
    else
      render json: { data: { error: "Unknow user with token #{params[:email]}", validated: false } }, status: :ok
    end
  end
end
