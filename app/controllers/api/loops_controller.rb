class Api::LoopsController < ApplicationController
  def show
    @loop = Loop.find(params[:id])
    render :show
  end

  def index
    @loops = Loop.all
    render :index
  end

  def create
    @loop = Loop.new(loop_params)
    @loop.author_id = current_user.id

    if @loop.save
      render :show
    end
  end

  def destroy
    loop = Loop.find(params[:id])
    loop.destroy
    render :root
  end

  private

  def loop_params
    params.require(:loop).permit(:title, :url)
  end


end
