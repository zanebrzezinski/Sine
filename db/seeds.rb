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
Loop.create(title: "one", url: "http://mirrors.creativecommons.org/movingimages/webm/ASharedCulture_240p.webm", author_id: bartolo.id)
Loop.create(title: "two", url: "http://mirrors.creativecommons.org/movingimages/webm/ASharedCulture_480p.webm", author_id: degrom.id)
Loop.create(title: "three", url: "http://mirrors.creativecommons.org/movingimages/webm/WannaWorkTogether_480p.webm", author_id: cespedes.id)
Loop.create(title: "four", url: "http://mirrors.creativecommons.org/movingimages/webm/WannaWorkTogether_480p.webm", author_id: lagares.id)
Loop.create(title: "five", url: "http://mirrors.creativecommons.org/movingimages/webm/BuildingonthePast_480p.webm", author_id: duda.id)
Loop.create(title: "six", url: "http://mirrors.creativecommons.org/movingimages/webm/ScienceCommonsJesseDylan_240p.webm", author_id: bartolo.id)
Loop.create(title: "seven", url: "http://mirrors.creativecommons.org/movingimages/webm/GetCreative_360p.webm", author_id: degrom.id)
Loop.create(title: "eight", url: "http://mirrors.creativecommons.org/movingimages/webm/MayerandBettle_480p.webm", author_id: cespedes.id)
Loop.create(title: "nine", url: "http://mirrors.creativecommons.org/movingimages/webm/MayerandBettle2_240p.webm", author_id: lagares.id)
Loop.create(title: "ten", url: "http://mirrors.creativecommons.org/movingimages/webm/ReticulumRex_240p.webm", author_id: duda.id)
Loop.create(title: "eleven", url: "http://mirrors.creativecommons.org/movingimages/webm/CCBrasil_240p.webm", author_id: bartolo.id)

Following.delete_all
Following.create(follower_id: degrom.id, followee_id: bartolo.id)
Following.create(follower_id: degrom.id, followee_id: cespedes.id)
Following.create(follower_id: cespedes.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: cespedes.id)
Following.create(follower_id: duda.id, followee_id: lagares.id)
Following.create(follower_id: duda.id, followee_id: degrom.id)
