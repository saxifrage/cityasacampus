class UsersController < ApplicationController

  def new
    @user = User.new
    @user.organizers.build
    @user.organizer_admins.build
  end

  def create
    @user = User.create(user_params)
    redirect_to :back
  end
  
  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation, :email, organizers_attributes: [
      :name, :description
    ])
  end

end