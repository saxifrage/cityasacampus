class Opportunity < ActiveRecord::Base
  has_many :opportunity_instances
  belongs_to :organizer
  has_one :after_this, class_name: "Opportunity", foreign_key: "after_this_id"
  has_one :before_this, class_name: "Opportunity", foreign_key: "before_this_id"
  belongs_to :resource_sub_type
  has_one :resource_type, through: :resource_sub_type

  validates :resource_sub_type, presence: true

  validates :name,              presence: true, allow_blank: false, uniqueness: { scope: :organizer }
  validates :description,       presence: true, allow_blank: false
  validates :registration_url,  presence: true, allow_blank: false
  validates :program_type,      presence: true, allow_blank: false
  validates :logo_url,          presence: true, allow_blank: false
  validates :is_online,         presence: true
  validates :contact_name,      presence: true, allow_blank: false
  validates :contact_email,     presence: true, allow_blank: false
  validates :contact_phone,     presence: true, allow_blank: false
  validates :organizer,         presence: true, allow_blank: false

  validates :price_level,       presence: true, :numericality => { :greater_than_or_equal_to => 0 }
  validates :min_age,           presence: true, :numericality => { :greater_than_or_equal_to => 0 }
  validates :max_age,           presence: true, :numericality => { :greater_than_or_equal_to => 0 }

  validates :registration_deadline, presence: true
  validates :starts_at,         presence: true
  validates :ends_at,           presence: true

  def active_model_serializer
    OpportunitySerializer
  end
end
