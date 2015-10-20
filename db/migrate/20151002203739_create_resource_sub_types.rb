class CreateResourceSubTypes < ActiveRecord::Migration
  def change
    create_table :resource_sub_types do |t|
        t.string :name
        t.belongs_to :resource_type, index: true
    end
    add_reference :opportunities, :resource_sub_type, index: true
    add_reference :opportunity_instances, :resource_sub_type, index: true
  end
end
