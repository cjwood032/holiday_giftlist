class Gift < ApplicationRecord
    belongs_to :user
    has_many :friend_gifts
    has_many :friends, through: :friend_gifts
end
