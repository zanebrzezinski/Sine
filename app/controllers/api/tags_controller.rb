class Api::TagsController < ApplicationController

  def show
    @tag = Tag.find(params[:id])
    @loops = @tag.loops

    render "api/loops/index"
  end
end
