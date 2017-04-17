class Api::PathwaysController < ApplicationController
  before_action :authenticate_user!
  before_action :set_pathway, only: [:show, :edit, :update, :destroy]

  # POST /pathways
  # POST /pathways.json
  def create
    @pathway = Pathway.new(pathway_params)

    respond_to do |format|
      if @pathway.save
        format.html { redirect_to @pathway, notice: 'Pathway was successfully created.' }
        format.json { render json: @pathway, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @pathway.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pathways/1
  # PATCH/PUT /pathways/1.json
  def update
    respond_to do |format|
      if @pathway.update(pathway_params)
        format.html { redirect_to @pathway, notice: 'Pathway was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @pathway.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pathways/1
  # DELETE /pathways/1.json
  def destroy
    @pathway.destroy
    respond_to do |format|
      format.html { redirect_to pathways_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pathway
      @pathway = Pathway.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pathway_params
      params.require(:pathway).permit([:name, :grid_id])
    end
end
