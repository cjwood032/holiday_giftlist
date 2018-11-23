class FriendSerializer < ActiveModel::Serializer
    attributes :id, :name
    belongs_to :user
    has_many :gifts 
end
