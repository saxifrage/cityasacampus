class Opportunity < ActiveRecord::Base
  has_many :opportunity_instances
  belongs_to :organization
end
