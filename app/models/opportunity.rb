class Opportunity < ActiveRecord::Base
  has_many :opportunity_instances
  belongs_to :organizer
  has_one :after_this, class_name: "Opportunity", foreign_key: "after_this_id"
  has_one :before_this, class_name: "Opportunity", foreign_key: "before_this_id"
  belongs_to :resource_sub_type
  has_one :resource_type, through: :resource_sub_type

  validates :resource_sub_type, presence: true

  def active_model_serializer
    OpportunitySerializer
  end
end
