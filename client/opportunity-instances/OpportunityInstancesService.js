angular.module('caac.opportunity-instances.service', [
  ])
  .factory('OpportunityInstancesService', ['$log', '$http', '$location',
    function($log, $http, $location) {
      var logger = $log.getInstance('OpportunitiesService');

      var selectAll = function() {
        return $http.get('opportunity_instances.json');
      };

      var selectByTerm = function(term, page) {
        term = term || '*';

        logger.info('attempting to retrieve opportunity instances related to "' + term + '" from backend');

        if (page) {
          return $http.get('/opportunity_instances/search/' + term.toLowerCase() + '.json?page=' + page);
        }

        return $http.get('/opportunity_instances/search/' + term.toLowerCase() + '.json?page=1');
      };

      var selectByUid = function(uid) {
        if (!uid) uid = '';

        logger.info('attempting to retrieve opportunity instance with uid of "' + uid + '" from backend');

        return $http.get('/opportunity_instances/' + uid + '.json');
      };

      var goToOpportunityInstance = function(uid) {
        if (uid) $location.path('opportunity-instances/' + uid);
      };

      var assignOrReorder = function(node) {
        console.log(node);
        $http.put('/nodes/' + node.id + '.json')
      };

      var unassign = function(node) {
        console.log(node);
        $http.put('/nodes/' + node.id + '.json')
      };

      return {
        selectAll: selectAll,
        selectByUid: selectByUid,
        selectByTerm: selectByTerm,
        goToOpportunityInstance: goToOpportunityInstance,
        assignOrReorder: assignOrReorder,
        unassign: unassign
      };
    }
  ]);
