angular.module('caac.organizers.service', [
  ])
  .factory('OrganizersService',
    function($http, $log, $location) {
      var logger = $log.getInstance('RegisterController');

      var selectOrganizers = function() {
        return $http.get('/api/v1/organizers/for-current-user.json');
      };

      var organizerId = function() {
        return parseInt($location.path().split('/')[3], 10);
      }

      var path = function(part) {
        return '#/dashboard/organizers/' + organizerId() + '/' + part;
      };

      return {
        selectOrganizers: selectOrganizers,
        organizerId: organizerId,
        path: path
      };
    }
  );
