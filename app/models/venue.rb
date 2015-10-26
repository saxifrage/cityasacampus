class Venue < ActiveRecord::Base
  has_many :opportunity_instances
  belongs_to :organizer

  def active_model_serializer
    VenueSerializer
  end
end
