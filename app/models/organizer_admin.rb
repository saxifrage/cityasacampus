class OrganizerAdmin < ActiveRecord::Base

  belongs_to :user
  belongs_to :organizer
  
  validates_presence_of :organizer_id, :user_id

end