class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      render api_user_url(user)
    else
      render root
  end

  def destroy
    sign_out
    render root
  end
end
