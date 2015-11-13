class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit

  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :null_session

  def index
    if signed_in?
      render 'dashboard/index'
    else
      #TODO: need to subclass devise controller in order
      #to default the `dashboard/` route to this...
      redirect_to '/dashboard/users/sign_in'
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :name
  end
end
