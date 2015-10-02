class OpportunitySerializer < ActiveModel::Serializer
  root :result
  attributes :context, :uid, :id, :name, :description
  has_one :organizer
  attributes :badge_class_id, :min_age, :max_age
  attributes :registration_deadline, :registration_url, :created,
    :changed, :ends, :starts
  attributes :after_this, :before_this, :resource_type, :resource_sub_type
  #has_one :topic

  def uid
    object.id
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

  def after_this
    object.after_this.id unless object.after_this.nil?
  end

  def before_this
    object.before_this.id unless object.before_this.nil?
  end

  def resource_type
    object.resource_type.name
  end

  def resource_sub_type
    object.resource_sub_type.name
  end
end
