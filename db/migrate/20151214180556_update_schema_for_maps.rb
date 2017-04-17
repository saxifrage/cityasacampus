class UpdateSchemaForMaps < ActiveRecord::Migration
  def change
    add_column :organizers, :draft_map_id, :int
    add_foreign_key :organizers, :maps, column: :draft_map_id
    add_column :organizers, :published_map_id, :int
    add_foreign_key :organizers, :maps, column: :published_map_id
    remove_column :maps, :name, :string
    change_column_null :grids, :name, false
    change_column_null :grids, :map_id, false
    change_column_null :pathways, :name, false
    change_column_null :pathways, :grid_id, false
  end
end
