json.extract! @loop, :id, :title, :author_id, :created_at
json.url @loop.loop_video
json.author @loop.author.username
json.profile_picture asset_path(@loop.author.profile_picture)
json.likes do
  json.array(@loop.likings) do |liking|
    json.user liking.username
  end
end
