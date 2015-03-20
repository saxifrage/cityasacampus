json.array!(@opportunity_instances) do |opportunity_instance|
  json.extract! opportunity_instance, :id, :name, :address, :description, :registration_url, :location_name, :registration_deadline, :program_type, :logo_url, :starts_at, :ends_at, :online_address, :zipcode, :city, :state, :is_online, :hide_reason, :hide, :contact_name, :contact_email, :contact_phone, :registration_url, :price_level, :min_age, :max_age, :extra_data
  json.url opportunity_instance_url(opportunity_instance, format: :json)
end
