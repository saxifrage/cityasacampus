class Api::OrganizersController < ApplicationController
  before_action :authenticate_user!

  # GET /organizers/for-current-user.json
  def for_current_user
    render json: current_user.organizers
  end
end
