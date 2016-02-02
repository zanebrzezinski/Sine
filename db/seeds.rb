# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.delete_all
bartolo = User.create(username: "Bartolo", password: "bartolo")
degrom = User.create(username: "Degrom", password: "degrom")
cespedes = User.create(username: "Yoenis", password: "Cespedex")
lagares = User.create(username: "Lagares", password: "Lagares")
duda = User.create(username: "Lucas", password: "dudaduda")

Loop.delete_all
loop = Loop.create(title: "Test", author_id: bartolo.id, loop_video: File.new("#{Rails.root}/app/assets/videos/temp_video.mp4"))
loop2 = Loop.create(title: "Spunky", author_id: degrom.id, loop_video: File.new("#{Rails.root}/app/assets/videos/temp_video.mp4"))
loop3 = Loop.create(title: "First loop", author_id: cespedes.id, loop_video: File.new("#{Rails.root}/app/assets/videos/spunky_Tadpole_-_Google_Video_512kb.mp4"))
loop4 = Loop.create(title: "First loop", author_id: lagares.id, loop_video: File.new("#{Rails.root}/app/assets/videos/superman_electric_earthquake_512kb.mp4"))
loop5 = Loop.create(title: "First loop", author_id: duda.id, loop_video: File.new("#{Rails.root}/app/assets/videos/the_new_three_stooges_the_noisy_silent_movie_512kb.mp4"))

Following.delete_all
Following.create(follower_id: degrom.id, followee_id: bartolo.id)
Following.create(follower_id: degrom.id, followee_id: cespedes.id)
Following.create(follower_id: cespedes.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: cespedes.id)
Following.create(follower_id: duda.id, followee_id: lagares.id)
Following.create(follower_id: duda.id, followee_id: degrom.id)

Like.delete_all
Like.create(liker_id: bartolo.id, loop_id: loop.id)
# Like.create(liker_id: degrom.id, loop_id: loop2.id)
# Like.create(liker_id: cespedes.id, loop_id: loop3.id)
# Like.create(liker_id: lagares.id, loop_id: loop4.id)
# Like.create(liker_id: duda.id, loop_id: loop5.id)

Repost.delete_all

Repost.create(reposter_id: degrom, loop_id: loop.id)
