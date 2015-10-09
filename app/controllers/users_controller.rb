class UsersController < ApplicationController

  def new
    @user = User.new
    @user.organizers.build
    @user.organizer_users.build
  end

  def create
    @user = User.create(user_params)
    if @user.save
      redirect_to '/#/'
    else
      flash['alert'] = @user.errors.full_messages
      render :new
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation, :email, :name, organizers_attributes: [
      :name, :description, :topic_id
    ])
  end

end