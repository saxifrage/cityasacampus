class CreateNodes < ActiveRecord::Migration
  def change
    create_table :nodes do |t|
      t.references :pathway, index: true, foreign_key: true, null: false
      t.references :opportunity, index: true, foreign_key: true, null: false
      t.integer :position, null: false

      t.timestamps null: false
    end
  end
end
