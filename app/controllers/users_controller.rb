class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render root
  end

  def show
    @user = User.find(params[:id])
    render root
  end

  private

  def user_params
    params.require(:user).permit(:password, :username)
  end
end
