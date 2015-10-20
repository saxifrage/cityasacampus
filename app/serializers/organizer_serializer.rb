class OrganizerSerializer < ActiveModel::Serializer
  root :organizer
  attributes :type, :description, :address, :logo, :name, :id, :uid, :url

  def type
    'Organizer'
  end

  def address
    '999 Pancake Way'
  end

  def logo
    object.logo_url
  end

  def uid
    object.id
  end
end
