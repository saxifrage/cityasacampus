class AddNameToUsers < ActiveRecord::Migration
  
  def up
    add_column :users, :name, :string
    User.where(name: nil).update_all(name: 'not specified')
    change_column :users, :name, :string, null: false
  end

  def down
    remove_column :users, :name
  end

end
