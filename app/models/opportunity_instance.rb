class OpportunityInstance < ActiveRecord::Base
  belongs_to :opportunity
  has_one :organizer, through: :opportunity
  belongs_to :location
  belongs_to :topic

  validates :difficulty, numericality: { greater_than: 0, less_than: 4 }, allow_blank: true
  validates :duration, numericality: true, allow_blank: true

  def active_model_serializer
    OpportunityInstanceSerializer
  end
end
