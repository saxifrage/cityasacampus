class AddAfterAndBeforeThisToOpportunities < ActiveRecord::Migration
  def change
    add_reference :opportunities, :after_this, index: true
    add_reference :opportunities, :before_this, index: true
  end
end
