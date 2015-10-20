angular.module('caac.shared.conf.service', [])
  .factory('ConfService', ['$window',
    function($window) {
      var c = [];

      var get = function(k) {
        var appEnv = $window.document.location.hostname;

        //shared
        c.APP = 'City as a Campus';
        c.CITY = 'Pittsburgh';
        c.GOOGLE_MAPS_ENDPOINT = 'https://maps.googleapis.com/maps/api/';

        //env specific
        if (['localhost', '127.0.0.1'].indexOf(appEnv) >= -1) { //this means dev env
          c.ENV = '(DEV) ';
          c.API = 'http://localhost:3000';

          return c[k];
        } else { //this means prod
          c.ENV = '';
          c.API = '';

          return c[k];
        }
      };

      return {
        get: get
      };
    }
  ]);