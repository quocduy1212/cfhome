class Api::ApiController < ActionController::Base
  before_action :require_login
  # protect_from_forgery with: :exception

  private

  rescue_from ActionController::MethodNotAllowed, with: :user_not_found
  rescue_from StandardError, with: :internal_server_error

  def internal_server_error
    render json: { data: { error: 'Internal server error' }, status: 500 }, status: :internal_server_error
  end

  def user_not_found
    render json: { data: { error: 'Unauthorized' }, status: 403 }, status: :forbidden
  end

  def require_login
    unless logged?
      raise ActionController::MethodNotAllowed, "Unauthorized"
    end
  end

  def logged?
    current_user.present?
  end

  def current_user
    @current_user ||= User.find_by_email(params[:token])
  end
end
