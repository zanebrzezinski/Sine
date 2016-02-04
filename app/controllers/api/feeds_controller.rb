class Api::FeedsController < ApplicationController

  def show
    @loops = Loop.includes(:author)
      .where(author_id: current_user.followed_users)

    @loops = @loops.reverse
    @loops = Kaminari.paginate_array(@loops).page(params[:page])
    render :show
  end

end
