class User < ActiveRecord::Base
  has_secure_password

  has_one :gotchi

  validates :password_digest, presence: true
  validates :name, presence: true
  validates :gotchi_name, presence: true

  validates :password, length: { minimum: 6 }, allow_nil: true

  def levelup!
    # self.gotchi.age += 1
    # self.save!
  end
end
