class Api::TagsController < ApplicationController

  def show
    @tag = Tag.find(params[:id])
    @loops = @tag.loops.reverse
    @loops = Kaminari.paginate_array(@loops).page(params[:page])

    render "api/loops/index"
  end
end
