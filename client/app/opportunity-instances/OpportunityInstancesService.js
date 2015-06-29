angular.module('caac.opportunity-instances.service', [
    'caac.shared.conf.service'
  ])
  .factory('OpportunityInstancesService', ['$log', 'ConfService', '$http',
    function($log, ConfService, $http) {
      var logger = $log.getInstance('OpportunitiesService');
      var selectByTerm = function(term, page) {
        term = term || '';

        logger.info('attempting to retrieve opportunity instances related to "' + term + '" from backend');

        if (page) {
          return $http.get(ConfService.get('API') + '/opportunity_instances/search/' + term.toLowerCase() + '.json?page=' + page);
        }

        return $http.get(ConfService.get('API') + '/opportunity_instances/search/' + term.toLowerCase() + '.json?page=1');
      };

      var selectByUid = function(uid) {
        if (!uid) uid = '';

        logger.info('attempting to retrieve opportunity instance with uid of "' + uid + '" from backend');

        return $http.get(ConfService.get('API') + '/opportunity_instances/' + uid + '.json');
      };

      return {
        selectByUid: selectByUid,
        selectByTerm: selectByTerm
      };
    }
  ]);