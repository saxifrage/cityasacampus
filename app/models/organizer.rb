class Organizer < ActiveRecord::Base

  has_many :opportunities

  has_many :users, through: :organizer_admins
  has_many :organizer_admins, dependent: :destroy

  def active_model_serializer
    OrganizerSerializer
  end
  
end
