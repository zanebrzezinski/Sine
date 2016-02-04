class Api::SessionsController < ApplicationController

  def show

    if current_user
      @user = User.includes(liked_loops: [:likes, :tags, { comments: :user, author: :followed_by_followings }]).find(current_user.id)
      render "api/users/show"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if @user.nil?
      render json: ["Invalid Login Details"], status: 401
    else
      sign_in(@user)
      render "api/users/show"
    end
  end

  def destroy
    sign_out
    render json: {}
  end


end
