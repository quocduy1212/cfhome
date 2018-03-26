class Api::FiltersController < Api::ApiController
  def summary
    result = MarketFilter.summary(params[:exchange], params[:btc], params[:usdt])
    render json: { data: result }, status: :ok
  end

  def indicators
    render json: { data: MarketFilter.indicators(params[:exchange], params[:base], params[:symbol]) }, status: :ok
  end

  def volume
    render json: { data: MarketFilter.volume}, status: :ok
  end
end
