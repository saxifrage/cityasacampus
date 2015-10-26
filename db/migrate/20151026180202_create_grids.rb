class CreateGrids < ActiveRecord::Migration
  def change
    create_table :grids do |t|
      t.string :name
      t.references :map, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
