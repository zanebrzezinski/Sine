json.extract! @user, :username, :id
json.profile_picture asset_path(@user.profile_picture)
json.loops do
  json.array!(@user.loops.reverse) do |loop|
    json.partial!("api/loops/loop", loop: loop)
  end
end
