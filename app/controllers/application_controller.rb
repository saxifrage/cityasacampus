class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def hello
    @organizer_id = request.host.split('.')[0]
    @opportunities = Opportunity.where('organizer_id = ?', @organizer_id.to_i)
    render 'dashboard/opportunities'
  end
end
