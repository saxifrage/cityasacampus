angular.module('caac.organizers.service', [
  ])
  .factory('OrganizersService',
    function($http, $log) {
      var logger = $log.getInstance('RegisterController');

      var selectOrganizers = function() {
        return $http.get('/api/v1/organizers/for-current-user.json');
      };

      return {
        selectOrganizers: selectOrganizers
      };
    }
  );
