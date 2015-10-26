class VenueSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :neighborhood, :map_url, :address, :latitude, :longitude
#    "venue": {
#        "@type":"Place",
#        "address": {
#            "streetAddress": "6587 Butler Street", 
#            "addressLocality": "Pittsburgh", 
#            "addressRegion": "PA", 
#            "postalCode": "15206", 
#            "addressCountry": "US", 
#            "latitude": 40.458334999999998, 
#            "longitude": -79.911413999999979
#        },
#        "hasMap": "https://www.google.com/map/carpentry_town",
#        "@id": "https://www.cityasacampus.org/venues/1060662062/", 
#        "name": "Carpentry Town", 
#        "neighborhood": "Lawrenceville",
#        "neighborhood_id": 12,
#        "url": "http://www.carpentrytown.biz",
#    },
end
