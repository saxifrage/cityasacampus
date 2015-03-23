json.array!(@opportunities) do |opportunity|
  json.extract! opportunity, :id, :name, :address, :description, :registration_url, :location_name, :registration_deadline, :program_type, :logo_url, :starts_at, :ends_at, :online_address, :zipcode, :city, :state, :is_online, :hide_reason, :hide, :contact_name, :contact_email, :contact_phone, :registration_url, :price_level, :min_age, :max_age, :extra_data
  json.url opportunity_url(opportunity, format: :json)
end
