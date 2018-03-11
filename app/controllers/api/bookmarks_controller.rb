class Api::BookmarksController < Api::ApiController
  def create
    bookmark = Bookmark.create({
      name: params[:name],
      symbol: params[:symbol],
      base: params[:base],
      exchange: params[:exchange],
      user: @current_user
    })
    render json: { data: bookmark.decorate.as_json }, status: :ok
  end

  def destroy
    bookmark = Bookmark.find(params[:id])
    bookmark.destroy
    render json: { data: bookmark.decorate.as_json }, status: :ok
  end
end
