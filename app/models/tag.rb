class Tag < ActiveRecord::Base

  validates :tag, presence: true, uniqueness: true

  include PgSearch
  multisearchable :against => [:tag]


  has_many(
    :taggings,
  )

  has_many(
    :loops,
    through: :taggings,
    source: :loop
  )

  def self.find_or_create(tag)
    newtag = Tag.find_by_tag(tag)
    if newtag.nil?
      newtag = Tag.new({tag: tag})
    end

    newtag
  end

end
