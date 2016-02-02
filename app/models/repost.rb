class Repost < ActiveRecord::Base

  validates :loop_id, :reposter_id, presence: true

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :reposter_id
  )

  belongs_to(
    :loop,
    class_name: "Loop",
    foreign_key: :loop_id
  )

end
