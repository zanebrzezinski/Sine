json.extract! @user, :username, :id
json.profile_picture asset_path(@user.profile_picture)
json.loops do
  json.array!(@user.loops.reverse) do |loop|
    json.id loop.id
    json.title loop.title
    json.url loop.loop_video
    json.author loop.author.username
    json.profile_picture loop.author.profile_picture
    json.created_at loop.created_at
    json.likes do
      json.array(loop.likes) do |like|
        json.id like.id
        json.liker_id like.liker_id
      end
    end
    json.tags do
      json.array(loop.tags) do |tag|
        json.id tag.id
        json.tag tag.tag
      end
    end
  end
end
