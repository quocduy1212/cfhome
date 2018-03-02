class Api::FiltersController < ApplicationController
  def summary
    begin
      result = MarketFilter.summary(params[:exchange], params[:btc], params[:usdt])
      render json: { data: result[:data][1...5] }, status: :ok
    rescue StandardError => ex
      DpxLogger.log_exception(ex)
      render json: { data: { error: ex } }, status: :ok
    end
  end

  def indicators
    begin
      render json: { data: MarketFilter.indicators(params[:market_name]) }, status: :ok
    rescue StandardError => ex
      DpxLogger.log_exception(ex)
      render json: { data: { error: ex } }, status: :ok
    end
  end
end
