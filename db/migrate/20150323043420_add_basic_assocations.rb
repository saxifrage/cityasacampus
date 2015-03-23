class AddBasicAssocations < ActiveRecord::Migration
  def change
    add_reference :opportunities, :organization, index: true
    add_reference :opportunity_instances, :opportunity, index: true
  end
end
