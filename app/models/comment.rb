class Comment < ActiveRecord::Base

  validates :comment, :user_id, :loop_id, presence: true

  belongs_to :loop

  belongs_to :user

end
