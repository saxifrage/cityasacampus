class OpportunitySerializer < ActiveModel::Serializer
  root :result
  attributes :context, :type, :uid, :id, :name, :description
  has_one :organizer
  attributes :min_age, :max_age
  attributes :registration_deadline, :registration_url, :created,
    :changed, :ends, :starts
  #has_one :topic

  def uid
    object.id
  end

  def type
    'EducationEvent'
  end

  def context
    '["http://schema.org", "http://schema.cityasacampus.org/context.json"]["http://schema.org", "http://schema.cityasacampus.org/context.json"]'
  end

  def hyper_id
    'https://cityasacampus.org/opportunities/instances/carpentry_workshop_101'
  end

  def created
    object.created_at
  end

  def changed
    object.updated_at
  end

  def ends
    object.ends_at
  end

  def starts
    object.starts_at
  end
end
