json.array!(@loops) do |loop|
  json.id loop.id
  json.title loop.title
  json.author_id loop.author_id
  json.author loop.author.username
  json.url loop.url
  json.created_at loop.created_at
end