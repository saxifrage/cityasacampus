class OpportunityInstance < ActiveRecord::Base
  belongs_to :opportunity
  has_one :organizer, through: :opportunity
  belongs_to :location
  belongs_to :topic

  def active_model_serializer
    OpportunityInstanceSerializer
  end
end
