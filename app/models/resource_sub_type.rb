class ResourceSubType < ActiveRecord::Base
  has_many :opportunities
  has_many :opportunity_instances
  belongs_to :resource_type

  def active_model_serializer
    ResourceSubTypeSerializer
  end
end