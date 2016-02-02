class Api::LikesController < ApplicationController

  def create
    @like = Like.new(like_params)
    if @like.save
      @loop = Loop.find(@like.loop)
      render "api/loops/show"
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    render json: @like
  end

  private

  def like_params
    params.require(:likes).permit(:loop_id, :liker_id)
  end

end
