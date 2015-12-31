angular.module('caac.opportunities.service', [
  ])
  .factory('OpportunitiesService', ['$log', '$http', '$location',
    function($log, $http, $location) {
      var logger = $log.getInstance('OpportunitiesService');

      var selectForOrganizer = function(organizerId) {
        return $http.get('/api/v1/opportunities.json?organizer_id='+organizerId);
      };

      var assignOrReorder = function(opportunityId, pathwayId, position) {
        $http.post('/api/v1/nodes.json', { opportunity_id: opportunityId
                                         , pathway_id: pathwayId
                                         , position: position
                                          });
      };

      var unassign = function(node) {
        $http.delete('/api/v1/nodes/' + node.id + '.json')
      };

      return {
        selectForOrganizer: selectForOrganizer,
        assignOrReorder: assignOrReorder,
        unassign: unassign
      };
    }
  ]);
