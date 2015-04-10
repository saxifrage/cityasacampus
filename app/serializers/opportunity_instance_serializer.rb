class OpportunityInstanceSerializer < ActiveModel::Serializer
  root :result
  attributes :context, :type
  attribute :hyper_id, key: :id
  attribute :id, key: :uid
  attributes :name, :description
  has_one :organizer
  attributes :min_age, :max_age
  attribute :venue_name
  has_one :location
  attribute :is_online, key: :online_opportunity
  attributes :ongoing, :price, :url, :registration_deadline, :registration_url, :external_url
  attribute :created_at, key: :created
  attribute :updated_at, key: :changed
  attribute :ends_at, key: :end
  attribute :starts_at, key: :start
  attributes :listed
  has_one :topic

  def type
    'EducationEvent'
  end

  def context
    '["http://schema.org", "http://schema.cityasacampus.org/context.json"]["http://schema.org", "http://schema.cityasacampus.org/context.json"]'
  end

  def hyper_id
    'https://cityasacampus.org/opportunities/instances/carpentry_workshop_101'
  end

  def venue_name
    location.name
  end
#{
#  "result": {
#    "meeting_format": {
#      "format_id": 2,
#      "language": ["Spanish", "English"],
#      "notes": "Enter through the side door of the building, the front door is broken.",
#    },
#    "listing_start": {
#        "timezone": "America/New_York", 
#        "local": "2015-03-06T19:00:00", 
#        "utc": "2015-03-07T02:00:00Z"
#    },
#    "listing_end": {
#        "timezone": "America/New_York", 
#        "local": "2015-03-06T19:00:00", 
#        "utc": "2015-03-07T02:00:00Z"
#    },
#    "meeting_times": [
#      {
#        "meeting_id": 1,
#        "meeting_start":{
#            "timezone": "America/New_York", 
#            "local": "2015-03-06T22:00:00", 
#            "utc": "2015-03-07T05:00:00Z"
#        },
#        "meeting_end":{
#            "timezone": "America/New_York", 
#            "local": "2015-03-06T22:00:00", 
#            "utc": "2015-03-07T05:00:00Z"
#        }
#      },
#      {
#        "meeting_id": 2,
#        "meeting_start":{
#            "timezone": "America/New_York", 
#            "local": "2015-04-06T22:00:00", 
#            "utc": "2015-04-07T05:00:00Z"
#        },
#        "meeting_end":{
#            "timezone": "America/New_York", 
#            "local": "2015-04-06T22:00:00", 
#            "utc": "2015-04-07T05:00:00Z"
#        }
#      },
#      {
#        "meeting_id": 3,
#        "meeting_start":{
#            "timezone": "America/New_York", 
#            "local": "2014-05-06T22:00:00", 
#            "utc": "2014-05-07T05:00:00Z"
#        },
#        "meeting_end":{
#            "timezone": "America/New_York", 
#            "local": "2015-06-06T22:00:00", 
#            "utc": "2015-06-07T05:00:00Z"
#        }
#      },
#    ],
#    "listed": true,
#    "topic": {
#        "resource_uri": "https://www.cityasacampus.org/v1/categories/carpentry-and-woodworking/", 
#        "id": "carpentry-and-woodworking",
#        "name": "Carpentry and Woodworking", 
#        "short_name": "Carpentry", 
#        "child_of_topic": "fabrication"
#    }, 
#    "badges": [],
#  },
#  "status": 201
#}
end
