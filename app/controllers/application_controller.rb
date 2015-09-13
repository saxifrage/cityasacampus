class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    #TODO: I don't link how it's redirecting but `users` is magically
    #handled by Devise and our User ActiveRecord. In other words,
    #we actually don't have a UserController and assoc. action to map to :/
    redirect_to '/dashboard/users/sign_in'
  end
end
