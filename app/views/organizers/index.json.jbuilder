json.array!(@organizers) do |organizer|
  json.extract! organizer, :id, :name, :description, :url, :logo_url
  json.url organizer_url(organizer, format: :json)
end
