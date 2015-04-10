class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.string :url
      t.string :neighborhood
      t.string :map_url
      t.text :address
      t.string :latitude
      t.string :longitude

      t.timestamps null: false
    end
  end
end
