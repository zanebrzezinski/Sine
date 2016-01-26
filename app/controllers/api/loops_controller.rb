class Api::LoopsController < ApplicationController
  def show
    @loop = Loop.find(params[:id])
    render :show
  end
end
