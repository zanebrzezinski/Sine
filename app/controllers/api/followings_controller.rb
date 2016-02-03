class Api::FollowingsController < ApplicationController

  def create
    @following = Following.new(followings_params)
    if @following.save
      render json: {}
    end
  end

  def destroy
    @following = Following.find(params[:id])
    @following.destroy
    render json: {}
  end

  private

  def followings_params
    params.require(:followings).permit(:follower_id, :followee_id)
  end

end
