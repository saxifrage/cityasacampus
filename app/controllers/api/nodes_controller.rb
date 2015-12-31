class Api::NodesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_node, only: [:show, :edit, :update, :destroy]

  # POST /nodes
  # POST /nodes.json
  def create

    opportunity = Opportunity.find_by_id(node_params[:opportunity_id])!
    if not current_user.organizers.include? opportunity.organizer
      return render :plain => '{"error":"you don\'t have permission to edit this node"}', :status => 403
    end

    pathway = Pathway.find_by_id(node_params[:pathway_id])!
  
    begin
      node = Node.where(opportunity_id: opportunity.id, pathway_id: pathway.id).take!
      node.position = node_params[:position]
    rescue
      node = Node.new(node_params)
    end
    node.save

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  # DELETE /nodes/1
  # DELETE /nodes/1.json
  def destroy
    @node.destroy
    respond_to do |format|
      format.html { redirect_to nodes_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_node
      @node = Node.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def node_params
      params.require(:node).permit([:name, :pathway_id, :opportunity_id, :position])
    end
end
