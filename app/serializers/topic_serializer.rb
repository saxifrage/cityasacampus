class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :child_of_topic
end
