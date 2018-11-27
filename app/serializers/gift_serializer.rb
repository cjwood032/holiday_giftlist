class GiftSerializer < ActiveModel::Serializer
    attributes :id, :name, :link, :price, :friend_id
    #belongs_to :friend
    belongs_to :user
end
