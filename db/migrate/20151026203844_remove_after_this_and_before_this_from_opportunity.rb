class RemoveAfterThisAndBeforeThisFromOpportunity < ActiveRecord::Migration
  def change
    remove_reference :opportunities, :after_this, index: true
    remove_reference :opportunities, :before_this, index: true
  end
end
