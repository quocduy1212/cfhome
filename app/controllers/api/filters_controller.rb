class Api::FiltersController < Api::ApiController
  def summary
    result = MarketFilter.summary(params[:exchange], params[:btc], params[:usdt])
    render json: result, status: :ok
  end

  def indicators
    render json: { data: MarketFilter.indicators(params[:exchange], params[:base], params[:symbol]) }, status: :ok
  end
end
