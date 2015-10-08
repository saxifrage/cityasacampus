class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :organizers, through: :organizer_admins
  has_many :organizer_admins, dependent: :destroy

  accepts_nested_attributes_for :organizers
  accepts_nested_attributes_for :organizer_admins
  
end