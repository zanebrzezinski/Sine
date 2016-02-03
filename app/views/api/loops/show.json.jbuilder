json.extract! @loop, :id, :title, :author_id, :created_at
json.url @loop.loop_video
json.author @loop.author.username
json.profile_picture asset_path(@loop.author.profile_picture)
json.likes do
  json.array(@loop.likes) do |like|
    json.id like.id
    json.liker_id like.liker_id
  end
end
json.tags do
  json.array(@loop.tags) do |tag|
    json.id tag.id
    json.tag tag.tag
  end
end
