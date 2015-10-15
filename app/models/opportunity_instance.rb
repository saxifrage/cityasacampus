class OpportunityInstance < ActiveRecord::Base
  belongs_to :opportunity
  has_one :organizer, through: :opportunity
  belongs_to :location
  belongs_to :topic
  belongs_to :resource_sub_type
  has_one :resource_type, through: :resource_sub_type

  validates :difficulty, numericality: { greater_than: 0, less_than: 4 }, allow_blank: true
  validates :duration, numericality: true, allow_blank: true

  def active_model_serializer
    OpportunityInstanceSerializer
  end

  def resource_type
    # Fall back to the Opportunity's resource type if the instance doesn't have one
    self[:resource_type] ? self[:resource_type] : self.opportunity.resource_type
  end

  def resource_sub_type
    # Fall back to the Opportunity's resource sub type if the instance doesn't have one
    self[:resource_sub_type] ? self[:resource_sub_type] : self.opportunity.resource_sub_type
  end
end
