class OrganizerSerializer < ActiveModel::Serializer
  root :organizer
  attributes :type, :description, :logo, :name, :id, :uid, :url

  def type
    'Organizer'
  end

  def logo
    object.logo_url
  end

  def uid
    object.id
  end
end
