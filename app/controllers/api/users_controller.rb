class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id]).includes(:loops).includes(:likes)
    render :show
  end

  def index
    @users = User.all.includes(:loops).includes(:likes)
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
