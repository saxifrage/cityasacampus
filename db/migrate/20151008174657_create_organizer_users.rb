class CreateOrganizerUsers < ActiveRecord::Migration
  
  def up
    create_table :organizer_users do |t|
      t.timestamps
      t.integer :user_id, null: false
      t.integer :organizer_id, null: false
    end
    add_index :organizer_users, [ :organizer_id, :user_id ]
  end

  def down
    drop_table :organizer_users
  end
  
end
