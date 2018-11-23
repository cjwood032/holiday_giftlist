class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :price
    belongs_to :friend
    belongs_to :user
end
