class Loop < ActiveRecord::Base

  has_attached_file :loop_video
  validates_attachment_content_type :loop_video, :content_type => /\Avideo\/.*\Z/

  validates :title, :author_id, presence: true

  belongs_to(
    :author,
    :class_name => "User",
    :foreign_key => :author_id,
    :primary_key => :id
  )

end
