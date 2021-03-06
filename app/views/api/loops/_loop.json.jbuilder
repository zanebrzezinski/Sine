json.id loop.id
json.title loop.title
json.url loop.loop_video
json.author_id loop.author_id
json.author loop.author.username
json.author_followers do
  json.array(loop.author.followed_by_followings) do |follower|
    json.id follower.id
    json.follower follower.follower_id
  end
end
json.profile_picture asset_path(loop.author.profile_picture)
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
json.comments do
  json.array(loop.comments) do |comment|
    json.partial!("api/comments/comment", comment: comment)
  end
end
