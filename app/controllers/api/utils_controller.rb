class SessionsController < ApplicationController

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
  end

end
