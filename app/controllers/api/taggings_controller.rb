class Api::TaggingsController < ApplicationController

  def create
    tags = tag_params[:tags].strip.split(/[\s#,]/)
    tags.each do |tag|
      if tag.length > 0
        @newtag = Tag.find_or_create(tag)
        if @newtag.valid?
          @newtag.save
          @tagging = Tagging.new(loop_id: tag_params[:loop_id], tag_id: @newtag.id)
          @tagging.save
        end
      end
    end
    @loop = Loop.find(tag_params[:loop_id])
    render "api/loops/show"
  end

  private

  def tag_params
    params.require(:taggings).permit(:loop_id, :tags)
  end

end
