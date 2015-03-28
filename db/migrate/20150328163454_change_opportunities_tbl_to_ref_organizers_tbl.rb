class ChangeOpportunitiesTblToRefOrganizersTbl < ActiveRecord::Migration
  def change
    remove_reference :opportunities, :organization, index: true
    add_reference :opportunities, :organizer, index: true
  end
end
