class OpportunityInstanceSerializer < ActiveModel::Serializer
  root :result
  attributes :context, :type, :uid, :id, :name, :description, :img
  has_one :organizer
  attributes :min_age, :max_age, :venue_name, :online_opportunity, :ongoing,
    :price, :registration_deadline, :registration_url, :created, :changed,
    :ends, :starts, :duration, :difficulty
  has_one :topic

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

  def img
    {
      src: object.logo_url,
      type: 'banner'
    }
  end

  def venue_name
    object.location_name
  end

  def online_opportunity
    object.is_online
  end

  def ongoing
    false
  end

  def price
    '%.2f' % (object.price.to_i/100.0)
  end
end
