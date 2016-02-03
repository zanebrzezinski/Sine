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
guest = User.create(username: "guest", password: "password")

Loop.delete_all
Loop.create(title: "glitchy", author_id: bartolo.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-10jce6g.mp420160202-32776-1w0ijxr.mp4")
Loop.create(title: "dick", author_id: bartolo.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-1fcubbl.mp420160202-32776-hz3ikj.mp4")
Loop.create(title: "jackie", author_id: degrom.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-1qmqivl.mp420160202-32776-oid9r4.mp4")
Loop.create(title: "square guy", author_id: degrom.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-1xoxwh6.mp420160202-32776-fy5ilw.mp4")
Loop.create(title: "oatmeal", author_id: cespedes.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-4l5rby.mp420160202-32776-1bpf2wz.mp4")
Loop.create(title: "baseball", author_id: cespedes.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-6juz36.mp420160202-32776-1q5dnr0.mp4")
Loop.create(title: "purple dick", author_id: duda.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-964q4i.mp420160202-32776-uxrx9j.mp4")
Loop.create(title: "family", author_id: duda.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-a1vneh.mp420160202-32776-3acqq.mp4")
Loop.create(title: "experience", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-ah7emp.mp420160202-32776-8r7654.mp4")
Loop.create(title: "Ike", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-kwdicw.mp420160202-32776-1qhydmn.mp4")
Loop.create(title: "Cereal", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-xw4as7.mp420160202-32776-jbpm4i.mp4")
Loop.create(title: "harry bellefonte", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-zbc36q.mp420160202-32776-1menla7.mp4")

Following.delete_all
Following.create(follower_id: degrom.id, followee_id: bartolo.id)
Following.create(follower_id: degrom.id, followee_id: cespedes.id)
Following.create(follower_id: cespedes.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: bartolo.id)
Following.create(follower_id: duda.id, followee_id: cespedes.id)
Following.create(follower_id: duda.id, followee_id: lagares.id)
Following.create(follower_id: duda.id, followee_id: degrom.id)
Following.create(follower_id: lagares.id, followee_id: bartolo.id)
Following.create(follower_id: lagares.id, followee_id: cespedes.id)
Following.create(follower_id: lagares.id, followee_id: degrom.id)
Following.create(follower_id: guest.id, followee_id: degrom.id)
Following.create(follower_id: guest.id, followee_id: bartolo.id)
Following.create(follower_id: guest.id, followee_id: cespedes.id)
Following.create(follower_id: guest.id, followee_id: duda.id)
Following.create(follower_id: guest.id, followee_id: lagares.id)
Following.create(follower_id: guest.id, followee_id: lagares.id)
