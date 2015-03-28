class Opportunity < ActiveRecord::Base
  has_many :opportunity_instances
  belongs_to :organizer
end
