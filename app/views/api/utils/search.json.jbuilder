json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.class == User
      @user = result
      json.partial!("api/users/user")
    else
      @loop = result
      json.partial!("api/loops/loop")
    end

    json._type result.class.to_s
  end
end
