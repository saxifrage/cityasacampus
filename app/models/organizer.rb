class Organizer < ActiveRecord::Base

  has_many :opportunities
  has_many :venues
  has_many :maps
  has_one :draft_map, class_name: "Map"
  has_one :published_map, class_name: "Map"

  validates_presence_of :name, :description

  has_many :users, through: :organizer_users
  has_many :organizer_users, dependent: :destroy

  def active_model_serializer
    OrganizerSerializer
  end

end
