class Api::FollowingsController < ApplicationController

  def create
    @following = Following.new(followings_params)
    if @following.save
      @user = User
      .includes(
      liked_loops: [:likes, :tags, { comments: :user, author:
        :followed_by_followings }],
      loops: [:likes, :tags, { comments: :user, author:
        :followed_by_followings }]
      ).find(current_user.id)
      render "api/users/show"
    end
  end

  def destroy
    @following = Following.find(params[:id])
    @following.destroy
    @user = User
    .includes(
    liked_loops: [:likes, :tags, { comments: :user, author:
      :followed_by_followings }],
    loops: [:likes, :tags, { comments: :user, author:
      :followed_by_followings }]
    ).find(current_user.id)
    render "api/users/show"
  end

  private

  def followings_params
    params.require(:followings).permit(:follower_id, :followee_id)
  end

end
