class PathwaySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :nodes
end
