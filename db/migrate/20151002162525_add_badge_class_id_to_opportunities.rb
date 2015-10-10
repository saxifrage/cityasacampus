class AddBadgeClassIdToOpportunities < ActiveRecord::Migration
  def change
    add_column :opportunities, :badge_class_id, :string
  end
end
