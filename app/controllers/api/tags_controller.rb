class Api::TagsController < ApplicationController

  def show
    @tag = Tag.find(params[:id])
    @loops = @tag.loops.page(params[:page])
    render "api/loops/index"
  end
end
