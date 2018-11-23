class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :friends
    has_many :gifts 
end
  