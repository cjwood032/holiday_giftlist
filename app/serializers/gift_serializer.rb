class GiftSerializer < ActiveModel::Serializer
    attributes :id, :name, :link, :price
    belongs_to :friend
    belongs_to :user
end
