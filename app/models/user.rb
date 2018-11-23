class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness: true
    validates :email, presence: true
    has_many :friends
    has_many :gifts, through: :friends
end
