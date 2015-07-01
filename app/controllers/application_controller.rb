class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  def hello
    
    @opportunities = Opportunity.all
    render 'dashboard/opportunities'
  end

  private

  def require_sign_in
    unless user_signed_in?
      redirect_to new_user_session_path
    end
  end
end
