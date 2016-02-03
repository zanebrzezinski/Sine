class Api::LoopsController < ApplicationController
  def show
    @loop = Loop.find(params[:id])
    render :show
  end

  def index
    @loops = Loop.all.includes(:author).sort_by(&:created_at).reverse
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
