angular.module('caac.shared.geo.google-maps.directive', [
    'caac.shared.geo.geocoder.service',
    'caac.shared.conf.service',
    'caac.shared.jquery.instance',
    'caac.shared.geo.google-maps.instance',
  ])
  .controller('GoogleMapsController', ['$scope', '$log', 'GeocoderService', 'jQueryInstance', 'GoogleMapsInstance',
    function($scope, $log, GeocoderService, jQueryInstance, GoogleMapsInstance) {
      var self = $scope;

      var logger = $log.getInstance('GoogleMapsController');

      self.map = null;
      self.viewType = GoogleMapsInstance.MapTypeId.ROADMAP;
      self.marker = null;
      self.lat = null;
      self.lng = null;
      self.canvas = null;
      self.zoomLevel = 16;
      //self.address

      self.construct = function() {
        self.$watch('address', function(v) {
          if (typeof v !== 'undefined') self.buildMap();
        });
      };

      self.setLatLong = function(lat, lng) {
        if (!lat || !lng) {
          throw new Error('lat/long not supplied');
        }

        logger.info('setting lat to ' + lat + ' & lng to ' + lng);
        self.lat = lat;
        self.lng = lng;
      };

      self.setCanvas = function() {
        logger.info('setting up opportunity instance map canvas');
        self.canvas = jQueryInstance('.map')[0];
      };

      self.setMap = function() {
        logger.info('displaying opportunity instance map');
        self.map = new GoogleMapsInstance.Map(self.canvas, {
          center: new GoogleMapsInstance.LatLng(self.lat, self.lng),
          zoom: self.zoomLevel,
          mapTypeId: self.viewType
        });
      };

      self.setMarker = function() {
        logger.info('displaying address marker on map');
        self.marker = new GoogleMapsInstance.Marker({
          position: {
            lat: self.lat,
            lng: self.lng
          },
          map: self.map,
        });
      };

      self.buildMap = function() {
        GeocoderService.retrieveLatLongFromAddr(self.address)
          .then(function(res) {
            return self.setLatLong(res.lat, res.lng);
          })
          .then(self.setCanvas)
          .then(self.setMap)
          .then(self.setMarker)
          .catch(function(e) {
            logger.error('map couldn\'t load ' + (e.message || ''));
          });
      };

      self.construct();
    }
  ])
  .directive('googleMap', [
    function() {
      return {
        restrict: 'E',
        template: '<div class="map"></div>',
        scope: {
          address: '='
        },
        controller: 'GoogleMapsController',
      };
    }
  ]);