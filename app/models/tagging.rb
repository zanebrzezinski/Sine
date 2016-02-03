class Tagging < ActiveRecord::Base

  validates :loop_id, :tag_id, presence: true

  belongs_to(
    :loop
  )

  belongs_to(
    :tag
  )

end
