class AddDifficultyAndDurationToOpportunityInstances < ActiveRecord::Migration
  def change
    add_column :opportunity_instances, :duration, :integer
    add_index  :opportunity_instances, :duration
    add_column :opportunity_instances, :difficulty, :integer
    add_index  :opportunity_instances, :difficulty
  end
end
