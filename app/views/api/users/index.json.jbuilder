json.array!(@users) do |user|
  json.id user.id
  json.username user.username
  json.profile_picture user.profile_picture
end
