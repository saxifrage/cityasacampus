class AddNeighborhoodToOpportunityInstance < ActiveRecord::Migration
  def change
    add_column :opportunity_instances, :neighborhood, :string
  end
end
