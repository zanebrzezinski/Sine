class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to root_url
    end
  end

  def show
    @user = User.find(params[:id])
    redirect_to root_url
  end

  private

  def user_params
    params.require(:user).permit(:password, :username)
  end
end
