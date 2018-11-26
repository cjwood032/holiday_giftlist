class FriendSerializer < ActiveModel::Serializer
    attributes :id, :name, :gift_status, :amount_spent
    belongs_to :user
    has_many :gifts 
end
