json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.class == User
      @user = result
      json.partial!("api/users/user")
    elsif result.class == Loop
      loop = result
      json.partial!("api/loops/loop", loop: loop)
    elsif result.class == Tag
      @tag = result
      json.partial!("api/tags/tag")
    end

    json._type result.class.to_s
  end
end
