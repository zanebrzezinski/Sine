json.extract! @user, :username
json.loops do
  json.array!(@user.loops) do |loop|
    json.id loop.id
    json.title loop.title
    json.url loop.url
    json.author loop.author.username
    json.created_at loop.created_at
  end
end
