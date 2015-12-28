class Node < ActiveRecord::Base
  belongs_to :pathway
  belongs_to :opportunity

  validates_presence_of :opportunity, :pathway
end
