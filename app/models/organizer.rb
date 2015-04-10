class Organizer < ActiveRecord::Base
  has_many :opportunities

  def active_model_serializer
    OrganizerSerializer
  end
end
