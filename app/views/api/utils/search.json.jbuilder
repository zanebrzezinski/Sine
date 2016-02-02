json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.class == User
      json.partial!("api/users/" + result.id)
    else
      json.partial!("api/loops/" + result.id)
    end

    json._type result.class.to_s
  end
end
