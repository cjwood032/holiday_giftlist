class FriendGift < ApplicationRecord
    belongs_to :friend
    belongs_to :gift
end
