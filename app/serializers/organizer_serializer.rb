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
    "http://cdn.evbuc.com/images/151295/28467766139/1/logo.jpg"
  end

  def uid
    object.id
  end
end
