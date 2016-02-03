class Tag < ActiveRecord::Base

  has_many(
    :taggings,
  )

  has_many(
    :loops,
    through: :taggings,
    source: :loop
  )

end
