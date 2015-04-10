json.array!(@locations) do |location|
  json.extract! location, :id, :name, :url, :neighborhood, :map_url, :address, :latitude, :longitude
  json.url location_url(location, format: :json)
end
