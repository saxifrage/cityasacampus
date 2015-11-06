class Organizer < ActiveRecord::Base

  has_many :opportunities
  has_many :venues

  validates_presence_of :name, :description
  
  has_many :users, through: :organizer_users
  has_many :organizer_users, dependent: :destroy

  def active_model_serializer
    OrganizerSerializer
  end

end