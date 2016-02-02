class Like < ActiveRecord::Base

  validates :loop_id, :liker_id, presence: true

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :liker_id
  )

  belongs_to(
    :loop,
    class_name: "Loop",
    foreign_key: :loop_id
  )

end
