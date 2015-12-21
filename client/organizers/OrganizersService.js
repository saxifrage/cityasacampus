angular.module('caac.organizers.service', [
  ])
  .factory('OrganizersService',
    function($http, $log) {
      var logger = $log.getInstance('RegisterController');

      var selectOrganizers = function() {
        return $http.get('/organizers');
      };

      return {
        selectOrganizers: selectOrganizers
      };
    }
  );
