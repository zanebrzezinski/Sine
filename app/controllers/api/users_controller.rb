class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    @users = User.all
    render :index
  end

  def create
    debugger
    @user = User.create!(user_params)
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:password, :username, :profile_picture)
  end

end
