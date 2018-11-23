class User < ApplicationRecord
    has_secure_password
    validates :Username, uniqueness: true
    validates :Username, presence: true
    has_many :friends
    has_many :gifts, through: :friends
end
