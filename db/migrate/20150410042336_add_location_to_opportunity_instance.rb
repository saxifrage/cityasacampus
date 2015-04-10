class AddLocationToOpportunityInstance < ActiveRecord::Migration
  def change
    add_reference :opportunity_instances, :location, index: true, foreign_key: true
  end
end
