class Organizer < ActiveRecord::Base

  has_many :opportunities
  
  validates_presence_of :name
  
  has_many :users, through: :organizer_users
  has_many :organizer_users, dependent: :destroy

  def active_model_serializer
    OrganizerSerializer
  end

end