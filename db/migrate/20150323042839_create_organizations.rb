class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name
      t.text :description
      t.string :url
      t.string :logo_url

      t.timestamps null: false
    end
  end
end
