class Api::GridsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_grid, only: [:show, :edit, :update, :destroy]

  # GET /grids
  # GET /grids.json
  def index

    # Convert the organizer_id to a map_id of a draft map
    organizer = Organizer.find(params['organizer_id'])
    if organizer.nil?
      throw grid_params
    end
    if not current_user.organizers.include? organizer
      return render :plain => '{"error":"you don\'t have permissions for this organizer"}', :status => 403
    end
    if organizer.draft_map.nil?
      organizer.draft_map = Map.create(organizer: organizer)
      organizer.save!
    end

    @grids = Grid.where("map_id = ?", organizer.draft_map.id)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @grids }
    end
  end

  # POST /grids
  # POST /grids.json
  def create

    # Convert the organizer_id to a map_id of a draft map
    organizer = Organizer.find(params['organizer_id'])
    if organizer.nil?
      throw grid_params
    end
    if organizer.draft_map.nil?
      # Assume they've already done a GET on grids.json
      throw grid_params
    end
    @grid = Grid.new(grid_params)
    @grid.map = organizer.draft_map

    respond_to do |format|
      if @grid.save
        format.html { redirect_to @grid, notice: 'Grid was successfully created.' }
        format.json { render json: @grid, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @grid.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /grids/1
  # PATCH/PUT /grids/1.json
  def update
    respond_to do |format|
      if @grid.update(grid_params)
        format.html { redirect_to @grid, notice: 'Grid was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @grid.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /grids/1
  # DELETE /grids/1.json
  def destroy
    @grid.destroy
    respond_to do |format|
      format.html { redirect_to grids_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_grid
      @grid = Grid.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def grid_params
      params.require(:grid).permit(:name, :organizer_id)
    end
end
