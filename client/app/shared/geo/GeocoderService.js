angular.module('caac.shared.geo.geocoder.service', [
    'caac.shared.conf.service',
  ])
  .factory('GeocoderService', ['$http', 'ConfService', '$log',
    function($http, ConfService, $log) {
      var logger = $log.getInstance('GeocoderService');

      var pullCoordinates = function(responseBody) {
        if (responseBody.data &&
          responseBody.data.results &&
          responseBody.data.results[0] &&
          responseBody.data.results[0].geometry) {
          return responseBody.data.results[0].geometry.location;
        }

        throw new Error('couldn\'t get coordinates from server');
      };

      var retrieveLatLongFromAddr = function(addr) {
        logger.info('attempting to retrieve lat/long for address ' + (addr || ''));
        return $http.get(ConfService.get('GOOGLE_MAPS_ENDPOINT') + 'geocode/json?address=' + addr)
          .then(pullCoordinates);
      };

      return {
        retrieveLatLongFromAddr: retrieveLatLongFromAddr,
      };
    }
  ]);