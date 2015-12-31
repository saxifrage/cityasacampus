class Api::OpportunitiesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_opportunity, only: [:show, :edit, :update, :destroy]

  # GET /api/v1/opportunities
  # GET /api/v1/opportunities.json
  def by_organizer

    # Convert the organizer_id to a map_id of a draft map
    organizer = Organizer.find(params['organizer_id'])
    if not current_user.organizers.include? organizer
      return render :plain => '{"error":"you don\'t have permissions for this organizer"}', :status => 403
    end

    @opportunities = Opportunity.where("organizer_id = ?", organizer.id)

    render json: @opportunities
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_opportunity
      @opportunity = OpportunityInstance.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def opportunity_params
      params.require(:opportunity).permit(:name, :organizer_id)
    end
end
