class Api::UsersController < ApplicationController

  def show
    @user = User
    .includes(
    liked_loops: [:likes, :tags, { comments: :user, author:
      :followed_by_followings }],
    loops: [:likes, :tags, { comments: :user, author:
      :followed_by_followings }]
    ).find(current_user.id)
    render :show
  end

  def userloops
    @loops = Loop.includes(:likes, :tags,
    { comments: :user, author: :followed_by_followings })
    .where("author_id = ?", params[:user_id])

    @loops = @loops.reverse
    @loops = Kaminari.paginate_array(@loops).page(params[:page])



    render "api/loops/index"
  end

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :show
    else
      render json: {}
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:password, :username, :profile_picture)
  end

end
