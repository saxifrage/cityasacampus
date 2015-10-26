class Map < ActiveRecord::Base
  belongs_to :organizer
  has_many :grids
  has_many :pathways, through: :grids
end
