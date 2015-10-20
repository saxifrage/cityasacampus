class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :name
  
  has_many :organizers, through: :organizer_users
  has_many :organizer_users, dependent: :destroy

  accepts_nested_attributes_for :organizers
  accepts_nested_attributes_for :organizer_users

end