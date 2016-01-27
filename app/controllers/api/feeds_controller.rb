class Api::FeedsController < ApplicationController

  before_action :ensure_signed_in

  def show
    @loops = Loop.includes(:author)
      .where(author_id: current_user.followed_users)
      .order(created_at: :desc)
    render :show
  end

end
