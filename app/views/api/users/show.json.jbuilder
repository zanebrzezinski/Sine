json.extract! @user, :username
json.profile_picture asset_path(@user.profile_picture)
json.loops do
  json.array!(@user.loops.reverse) do |loop|
    json.id loop.id
    json.title loop.title
    json.url loop.url
    json.author loop.author.username
    json.profile_picture loop.author.profile_picture
    json.created_at loop.created_at
  end
end
