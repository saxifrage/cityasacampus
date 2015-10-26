class AddOrganizerReferenceToVenues < ActiveRecord::Migration
  def change
    add_reference :venues, :organizer, index: true, foreign_key: true
  end
end
