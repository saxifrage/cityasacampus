class RemoveTopicFromOrganizer < ActiveRecord::Migration
  def change
    remove_reference :organizers, :topic, index: true
    add_index :organizers, :name
  end
end
