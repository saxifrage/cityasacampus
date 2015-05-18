class AddTopicToOrganizerAndOpportunities < ActiveRecord::Migration
  def change
    add_reference :opportunities, :topic, index: true, foreign_key: true
    add_reference :organizers, :topic, index: true, foreign_key: true
  end
end
