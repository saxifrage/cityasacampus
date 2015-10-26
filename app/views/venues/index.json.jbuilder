json.array!(@venues) do |venue|
  json.extract! venue, :id, :name, :url, :neighborhood, :map_url, :address, :latitude, :longitude
  json.url venue_url(venue, format: :json)
end
