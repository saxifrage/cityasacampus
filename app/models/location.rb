class Location < ActiveRecord::Base
  has_many :opportunity_instances

  def active_model_serializer
    LocationSerializer
  end
end
