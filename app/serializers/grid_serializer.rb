class GridSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :pathways
end
