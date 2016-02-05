# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.delete_all
bartolo = User.create(username: "Bartolo", password: "bartolo", profile_picture: "http://assets.nydailynews.com/polopoly_fs/1.1743180!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/2015-mets-spring-training-portraits-bartolo-colon.jpg")
degrom = User.create(username: "Degrom", password: "degrom", profile_picture: "http://metsmerizedonline.com/wp-content/uploads/2015/04/IMG_20150419_130107-e1429490604945.jpg?6c20df")
cespedes = User.create(username: "Yoenis", password: "Cespedex", profile_picture: "http://i.imgur.com/esrM4wd.png")
lagares = User.create(username: "Lagares", password: "Lagares", profile_picture: "http://www3.pictures.zimbio.com/gi/Juan+Lagares+m_q_WonA_hQm.jpg")
duda = User.create(username: "Lucas", password: "dudaduda", profile_picture: "https://pbs.twimg.com/media/CYyQiQ3WkAEti6A.jpg")
guest = User.create(username: "guest", password: "password")

Loop.delete_all
one = Loop.create(title: "glitchy", author_id: bartolo.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-10jce6g.mp420160202-32776-1w0ijxr.mp4")
three = Loop.create(title: "jackie", author_id: degrom.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-1qmqivl.mp420160202-32776-oid9r4.mp4")
ten = Loop.create(title: "Ike", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-kwdicw.mp420160202-32776-1qhydmn.mp4")
six = Loop.create(title: "baseball", author_id: cespedes.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-6juz36.mp420160202-32776-1q5dnr0.mp4")
eleven = Loop.create(title: "Cereal", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-xw4as7.mp420160202-32776-jbpm4i.mp4")
two = Loop.create(title: "dick", author_id: bartolo.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-1fcubbl.mp420160202-32776-hz3ikj.mp4")
eight = Loop.create(title: "family", author_id: duda.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-a1vneh.mp420160202-32776-3acqq.mp4")
twelve = Loop.create(title: "harry bellefonte", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-zbc36q.mp420160202-32776-1menla7.mp4")
five = Loop.create(title: "oatmeal", author_id: cespedes.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-4l5rby.mp420160202-32776-1bpf2wz.mp4")
seven = Loop.create(title: "purple dick", author_id: duda.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-964q4i.mp420160202-32776-uxrx9j.mp4")
nine = Loop.create(title: "experience", author_id: guest.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-ah7emp.mp420160202-32776-8r7654.mp4")
four = Loop.create(title: "square guy", author_id: degrom.id, loop_video: "https://s3.amazonaws.com/sine-app-seeds/RackMultipart20160202-32776-1xoxwh6.mp420160202-32776-fy5ilw.mp4")

Tag.delete_all
ken = Tag.create(tag: "Kennedy")
dick = Tag.create(tag: "dick")
election = Tag.create(tag: "election")
commercial = Tag.create(tag: "commercial")
baseball = Tag.create(tag: "baseball")

Tagging.delete_all
Tagging.create(loop_id: one.id, tag_id: ken.id)
Tagging.create(loop_id: one.id, tag_id: election.id)
Tagging.create(loop_id: one.id, tag_id: dick.id)
Tagging.create(loop_id: two.id, tag_id: dick.id)
Tagging.create(loop_id: two.id, tag_id: election.id)
Tagging.create(loop_id: three.id, tag_id: election.id)
Tagging.create(loop_id: four.id, tag_id: ken.id)
Tagging.create(loop_id: five.id, tag_id: commercial.id)
Tagging.create(loop_id: six.id, tag_id: baseball.id)
Tagging.create(loop_id: seven.id, tag_id: dick.id)
Tagging.create(loop_id: seven.id, tag_id: election.id)
Tagging.create(loop_id: eight.id, tag_id: ken.id)
Tagging.create(loop_id: eight.id, tag_id: election.id)
Tagging.create(loop_id: eight.id, tag_id: commercial.id)
Tagging.create(loop_id: nine.id, tag_id: dick.id)
Tagging.create(loop_id: nine.id, tag_id: election.id)
Tagging.create(loop_id: ten.id, tag_id: election.id)
Tagging.create(loop_id: eleven.id, tag_id: commercial.id)
Tagging.create(loop_id: twelve.id, tag_id: election.id)

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

Like.delete_all
Like.create(loop_id: one, liker_id: bartolo.id)
Like.create(loop_id: one, liker_id: degrom.id)
Like.create(loop_id: one, liker_id: cespedes.id)
Like.create(loop_id: one, liker_id: duda.id)
Like.create(loop_id: three, liker_id: degrom.id)
Like.create(loop_id: three, liker_id: cespedes.id)
Like.create(loop_id: ten, liker_id: bartolo.id)
Like.create(loop_id: ten, liker_id: cespedes.id)
Like.create(loop_id: six, liker_id: degrom.id)
Like.create(loop_id: eleven, liker_id: degrom.id)
Like.create(loop_id: eleven, liker_id: lagares)
Like.create(loop_id: eleven, liker_id: duda.id)
Like.create(loop_id: eleven, liker_id: guest.id)
Like.create(loop_id: two, liker_id: bartolo.id)
Like.create(loop_id: eight, liker_id: degrom.id)
Like.create(loop_id: eight, liker_id: lagares)
Like.create(loop_id: eight, liker_id: duda.id)
Like.create(loop_id: twelve, liker_id: bartolo.id)
Like.create(loop_id: twelve, liker_id: degrom.id)
Like.create(loop_id: seven, liker_id: guest.id)
Like.create(loop_id: seven, liker_id: bartolo.id)
Like.create(loop_id: nine, liker_id: lagares)
Like.create(loop_id: four, liker_id: guest.id)
