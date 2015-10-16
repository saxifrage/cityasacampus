angular.module('caac.shared.geo.google-maps.instance', [

  ])
  .factory('GoogleMapsInstance', [
    function() {
      return google.maps;
    }
  ]);