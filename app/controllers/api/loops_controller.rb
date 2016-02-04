class Api::LoopsController < ApplicationController
  def show
    @loop = Loop.page(params[:page])
    .includes(:likes, :tags, { comments: :user, author: :followed_by_followings }).find(params[:id])
    render :show
  end

  def index
    @loops = Loop.all
      .includes(:likes, :tags,
      { comments: :user, author: :followed_by_followings })
      .sort_by(&:created_at)

    @loops = @loops.reverse
    @loops = Kaminari.paginate_array(@loops).page(params[:page])
    render :index
  end

  def create
    @loop = current_user.loops.new
    @loop.crop_video(loop_params[:loop_video])
    @loop.title = loop_params[:title]

    if @loop.save
      render :show
    end
  end

  def destroy
    @loop = Loop.find(params[:id])
    @loop.destroy
    render json: @loop
  end

  private

  def loop_params
    params.require(:loop).permit(:title, :loop_video)
  end


end
