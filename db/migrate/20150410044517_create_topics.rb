class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :name
      t.string :short_name
      t.string :child_of_topic

      t.timestamps null: false
    end
  end
end
