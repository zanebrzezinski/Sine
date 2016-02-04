class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render :show
    end
  end

  def index
    @comments = Comment.all.where("loop_id = #{params[:id]}")

    render :index
  end

  private

  def comment_params
    params.require(:comment).permit(:comment)
  end
end
