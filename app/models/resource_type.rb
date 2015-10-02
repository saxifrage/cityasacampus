class ResourceType < ActiveRecord::Base
  has_many :resource_sub_types

  def active_model_serializer
    ResourceTypeSerializer
  end
end