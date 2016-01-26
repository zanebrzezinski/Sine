# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.delete_all
bartolo = User.create(username: "Bartolo", password: "bartolo")

Loop.delete_all
Loop.create(title: "test", url: "http://mirrors.creativecommons.org/movingimages/webm/ASharedCulture_240p.webm", author_id: bartolo.id)
