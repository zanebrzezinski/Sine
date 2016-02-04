class Api::FeedsController < ApplicationController

  def show
    @loops = Loop.page(params[:page])includes(:author)
      .where(author_id: current_user.followed_users)
      .order(created_at: :desc)
    render :show
  end

end
