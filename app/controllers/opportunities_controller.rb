class OpportunitiesController < ApplicationController
  before_action :set_opportunity, only: [:show, :edit, :update, :destroy]
  before_action :set_organizers, only: [:edit, :new]
  before_action :authenticate_user!, except: [:index, :show]

  # GET /opportunities
  # GET /opportunities.json
  def index
    respond_to do |format|
      format.html do
        @opportunities = policy_scope(Opportunity)
        render 'dashboard/opportunities'
      end
      format.json { render json: Opportunity.all }
    end
  end

  # GET /opportunities/1
  # GET /opportunities/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render json: @opportunity }
    end
  end

  # GET /opportunities/new
  def new
    @opportunity = Opportunity.new
  end

  @@permitted_params = [:name, :address, :description, :registration_url, :location_name,
                        :registration_deadline, :program_type, :logo_url, :starts_at,
                        :ends_at, :online_address, :zipcode, :city, :state, :is_online,
                        :hide_reason, :hide, :contact_name, :contact_email, :contact_phone,
                        :registration_url, :price_level, :min_age, :max_age, :extra_data,
                        :topic_id, :organizer_id, :resource_sub_type_id]

  # GET,POST /opportunities/bulk-add
  def bulk_add
    @permitted_params = @@permitted_params
    @opportunities = []
    @nbad = 0
    @nerrors = 0

    if request.method == 'POST'
      Opportunity.transaction do
        CSV.parse(params[:csv].read, headers: true) do |row|
          topic = Topic.find_by_name(row.delete('topic'))
          sub_type = ResourceSubType.find_by_name(row.delete('resource_sub_type'))

          row['organizer_id'] = params[:organizer_id]
          row['topic_id'] = unless topic.nil? then topic.id else nil end
          row['resource_sub_type_id'] = unless sub_type.nil? then sub_type.id else nil end

          opportunity = Opportunity.create(row.to_h)
          @opportunities.push(opportunity)
          if opportunity.errors.count > 0
            @nbad += 1
            @nerrors += opportunity.errors.count
          end
        end
      end
    end

    @topic_names = Topic.pluck(:name)
    @sub_type_names = ResourceSubType.pluck(:name)
  end

  # GET /opportunities/1/edit
  def edit
    authorize @opportunity
  end

  # POST /opportunities
  # POST /opportunities.json
  def create
    @opportunity = Opportunity.new(opportunity_params)
    authorize @opportunity
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
    authorize @opportunity
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
    authorize @opportunity
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

    def set_organizers
      @organizers = current_user.organizers
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def opportunity_params
      params.require(:opportunity).permit(@@permitted_params)
    end
end
