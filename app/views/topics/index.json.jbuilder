json.array!(@topics) do |topic|
  json.extract! topic, :id, :name, :short_name, :child_of_topic
  json.url topic_url(topic, format: :json)
end
