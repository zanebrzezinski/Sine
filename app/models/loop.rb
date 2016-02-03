class Loop < ActiveRecord::Base

  has_attached_file :loop_video
  validates_attachment_content_type :loop_video, :content_type => /\Avideo\/.*\Z/

  validates :title, :author_id, presence: true

  include PgSearch
  multisearchable :against => [:title]

  belongs_to(
    :author,
    :class_name => "User",
    :foreign_key => :author_id,
    :primary_key => :id
  )

  has_many(
    :likes,
    class_name: "Like",
    foreign_key: :loop_id
  )

  has_many(
    :likings,
    through: :likes,
    source: :user
  )

  has_many(
    :reposts,
    class_name: "Repost",
    foreign_key: :loop_id
  )

  has_many(
    :reposters,
    through: :reposts,
    source: :user
  )

  has_many(
    :taggings
  )

  has_many(
    :tags,
    through: :taggings,
    source: :tag
  )

  def crop_video(video)

      offset = 0
      duration = 7
      current_format = File.extname(video.path)
      basename = File.basename(video.path)

      src = video
      dst = Tempfile.new([basename, current_format])
      dst.binmode

      system("ffmpeg -y -ss #{offset} -i #{src.path} -t #{duration} #{dst.path}")

      self.loop_video = dst
  end

end
