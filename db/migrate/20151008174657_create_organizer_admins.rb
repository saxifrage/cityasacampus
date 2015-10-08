class CreateOrganizerAdmins < ActiveRecord::Migration
  
  def up
    create_table :organizer_admins do |t|
      t.timestamps
      t.integer :user_id, null: false
      t.integer :organizer_id, null: false
    end
    add_index :organizer_admins, [ :organizer_id, :user_id ]
  end

  def down
    drop_table :organizer_admins
  end
  
end
