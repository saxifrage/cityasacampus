class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.string :name
      t.references :organizer, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
