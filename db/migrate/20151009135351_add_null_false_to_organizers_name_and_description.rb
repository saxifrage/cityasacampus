class AddNullFalseToOrganizersNameAndDescription < ActiveRecord::Migration
  
  def up
    Organizer.where(description: nil).update_all(description: 'n/a')
    change_column :organizers, :name, :string, null: false
    change_column :organizers, :description, :string, null: false
  end

  def down
    change_column :organizers, :name, :string, null: true
    change_column :organizers, :description, :string, null: true
  end

end
