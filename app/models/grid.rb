class Grid < ActiveRecord::Base
  belongs_to :map
  has_many :pathways
  validates :name, presence: true, allow_blank: false
end
