class SessionsController < ApplicationController


  def omniauth_twitter
    debugger
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in(@user)
    redirect_to root_url + '#/'
  end

end
