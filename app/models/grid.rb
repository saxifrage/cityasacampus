class Grid < ActiveRecord::Base
  belongs_to :map
  has_many :pathways, :dependent => :delete_all
  validates :name, presence: true, allow_blank: false
end
