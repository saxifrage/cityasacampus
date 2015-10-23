class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception 

  def index
    if signed_in?
      render 'dashboard/index'
    else
      #TODO: need to subclass devise controller in order
      #to default the `dashboard/` route to this...
      redirect_to '/dashboard/users/sign_in'
    end
  end
end
