class RenameLocationsToVenues < ActiveRecord::Migration
  def change
    rename_table :locations, :venues
    rename_column :opportunity_instances, :location_id, :venue_id
  end
end
