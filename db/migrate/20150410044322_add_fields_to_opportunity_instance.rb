class AddFieldsToOpportunityInstance < ActiveRecord::Migration
  def change
    add_column :opportunity_instances, :ongoing, :boolean
    add_column :opportunity_instances, :price, :integer
    add_column :opportunity_instances, :url, :string
    add_column :opportunity_instances, :external_url, :string
    add_column :opportunity_instances, :listed, :boolean
  end
end
