class OpportunitiesController < ApplicationController
  before_action :set_opportunity, only: [:show, :edit, :update, :destroy]

  # GET /opportunities
  # GET /opportunities.json
  def index
    @opportunities = Opportunity.all
    render json: @opportunities
  end

  # GET /opportunities/1
  # GET /opportunities/1.json
  def show
    render json: @opportunity
  end

  # GET /opportunities/new
  def new
    @opportunity = Opportunity.new
  end

  # GET /opportunities/1/edit
  def edit
  end

  # POST /opportunities
  # POST /opportunities.json
  def create
    @opportunity = Opportunity.new(opportunity_params)

    respond_to do |format|
      if @opportunity.save
        format.html { redirect_to @opportunity, notice: 'Opportunity was successfully created.' }
        format.json { render :show, status: :created, location: @opportunity }
      else
        format.html { render :new }
        format.json { render json: @opportunity.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /opportunities/1
  # PATCH/PUT /opportunities/1.json
  def update
    respond_to do |format|
      if @opportunity.update(opportunity_params)
        format.html { redirect_to @opportunity, notice: 'Opportunity was successfully updated.' }
        format.json { render :show, status: :ok, location: @opportunity }
      else
        format.html { render :edit }
        format.json { render json: @opportunity.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /opportunities/1
  # DELETE /opportunities/1.json
  def destroy
    @opportunity.destroy
    respond_to do |format|
      format.html { redirect_to opportunities_url, notice: 'Opportunity was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_opportunity
      @opportunity = Opportunity.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def opportunity_params
      params.require(:opportunity).permit(:name, :address, :description, :registration_url, :location_name, :registration_deadline, :program_type, :logo_url, :starts_at, :ends_at, :online_address, :zipcode, :city, :state, :is_online, :hide_reason, :hide, :contact_name, :contact_email, :contact_phone, :registration_url, :price_level, :min_age, :max_age, :extra_data)
    end
end
