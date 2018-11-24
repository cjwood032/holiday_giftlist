class Gift < ApplicationRecord
    belongs_to :user
    has_many :friends, through: :friend_gifts
end
