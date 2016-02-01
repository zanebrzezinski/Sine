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


Following.delete_all
Following.create(follower_id: degrom.id, followee_id: bartolo.id)
Following.create(follower_id: degrom.id, followee_id: cespedes.id)
Following.create(follower_id: cespedes.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: cespedes.id)
Following.create(follower_id: duda.id, followee_id: lagares.id)
Following.create(follower_id: duda.id, followee_id: degrom.id)
