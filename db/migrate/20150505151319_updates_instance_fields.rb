class UpdatesInstanceFields < ActiveRecord::Migration
  def change
    add_column :opportunity_instances, :short_description, :text
  end
end
