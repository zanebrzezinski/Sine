class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  has_attached_file :profile_picture, default_url: "https://s3.amazonaws.com/sine-dev/users/profile_pictures/000/000/016/original/sine_wave.jpg"
  validates_attachment_content_type :profile_picture, content_type: /\Aimage\/.*\Z/

  attr_reader :password

  after_initialize :ensure_session_token

  include PgSearch
  multisearchable :against => [:username]


  has_many(
    :loops,
    :class_name => "Loop",
    :foreign_key => :author_id,
    :primary_key => :id
  )

  has_many(
    :followings_followed,
    class_name: "Following",
    foreign_key: :follower_id,
    primary_key: :id
  )

  has_many(
    :followed_by_followings,
    class_name: "Following",
    foreign_key: :followee_id,
    primary_key: :id
  )

  has_many(
    :followed_users,
    through: :followings_followed,
    source: :followee
  )

  has_many(
    :followers,
    through: :followed_by_followings,
    source: :follower,
  )

  has_many(
    :likes,
    class_name: "Like",
    foreign_key: :liker_id
  )

  has_many(
    :liked_loops,
    through: :likes,
    source: :loop
  )

  has_many(
    :reposts,
    class_name: "Repost",
    foreign_key: :reposter_id
  )

  has_many(
    :reposted_loops,
    through: :reposts,
    source: :loop
  )

  has_many (
    :comments
  )

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)

    return user if user

    User.create(
      provider: provider,
      uid: uid,
      profile_picture: auth_hash[:info][:image],
      username: auth_hash[:info][:nickname],
      password: SecureRandom::urlsafe_base64
    )
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end


end
