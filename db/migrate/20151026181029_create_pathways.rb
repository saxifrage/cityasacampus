class CreatePathways < ActiveRecord::Migration
  def change
    create_table :pathways do |t|
      t.string :name
      t.references :grid, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
