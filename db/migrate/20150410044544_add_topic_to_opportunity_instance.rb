class AddTopicToOpportunityInstance < ActiveRecord::Migration
  def change
    add_reference :opportunity_instances, :topic, index: true, foreign_key: true
  end
end
