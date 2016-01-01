class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit

  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :null_session

  def index
    if signed_in?
      render 'dashboard/index'
    else
      redirect_to '/dashboard/users/sign_in'
    end
  end

  def not_found
    # Simply reloads Angular SPA at homepage
    redirect_to '/'
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:account_update).push(organizer_ids: [])
    devise_parameter_sanitizer.for(:sign_up).push(:name, organizers_attributes: [:name, :description])
  end
end
