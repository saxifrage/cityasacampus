class Pathway < ActiveRecord::Base
  belongs_to :grid
  has_many :nodes
  has_many :opportunities, through: :nodes
  has_one :map, through: :grid
  validates :grid_id, presence: true, allow_blank: false
  validates :name, presence: true, allow_blank: false

  alias_method :unordered_nodes, :nodes
  alias_method :unordered_opportunities, :opportunities

  def nodes
    Node.includes(:opportunity).where(pathway_id: self.id).order(:position)
  end

  def opportunities
    self.nodes.collect(&:opportunity)
  end
end
