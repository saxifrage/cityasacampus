class ChangeOrganzationsTblToOrganizersTbl < ActiveRecord::Migration
  def change
    rename_table :organizations, :organizers
  end
end