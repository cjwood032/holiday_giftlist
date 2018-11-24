class Friend < ApplicationRecord
    belongs_to :user
    has_many :gifts, through: :friend_gifts
end
