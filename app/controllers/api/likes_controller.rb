class Api::LikesController < ApplicationController

  def create
    @like = Like.new(like_params)
    if @like.save
      render json: @like
    end
  end

  private

  def like_params
    params.require(:likes).permit(:loop_id, :liker_id)
  end

end
