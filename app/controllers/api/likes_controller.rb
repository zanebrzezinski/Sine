class Api::LikesController < ApplicationController

  def create

    @like = Like.new(like_params)
    debugger
    if @like.save
      render "api/loops"
    end
  end

  private

  def like_params
    params.require(:likes).permit(:loop_id, :liker_id)
  end

end
