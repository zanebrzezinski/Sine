json.extract! @user, :username, :id, :likes, :followers, :followed_users
json.profile_picture asset_path(@user.profile_picture)
json.liked_loops do
  json.array!(@user.liked_loops) do |loop|
    json.partial!("api/loops/loop", loop: loop)
  end
end
json.loops do
  json.array!(@user.loops.reverse) do |loop|
    json.partial!("api/loops/loop", loop: loop)
  end
end
