class Api::FeedsController < ApplicationController

  def show
    @loops = Loop.includes(:author)
      .where(author_id: current_user.followed_users)
      .order(created_at: :desc).includes(:likes)
    render :show
  end

end
