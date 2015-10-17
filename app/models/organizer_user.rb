class OrganizerUser < ActiveRecord::Base

  belongs_to :user
  belongs_to :organizer

  validates_presence_of :organizer_id, :user_id

  accepts_nested_attributes_for :user
  accepts_nested_attributes_for :organizer
  
end