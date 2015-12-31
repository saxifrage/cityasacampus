angular.module('caac.opportunities.service', [
  ])
  .factory('OpportunitiesService', ['$log', '$http', '$location',
    function($log, $http, $location) {
      var logger = $log.getInstance('OpportunitiesService');

      var selectForOrganizer = function(organizerId) {
        return $http.get('/api/v1/opportunities.json?organizer_id='+organizerId);
      };

      var assignOrReorder = function(node) {
        console.log(node);
        $http.put('/api/v1/nodes/' + node.id + '.json')
      };

      var unassign = function(node) {
        console.log(node);
        $http.put('/api/v1/nodes/' + node.id + '.json')
      };

      return {
        selectForOrganizer: selectForOrganizer,
        assignOrReorder: assignOrReorder,
        unassign: unassign
      };
    }
  ]);
