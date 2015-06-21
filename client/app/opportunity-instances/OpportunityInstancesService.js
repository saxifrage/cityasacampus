angular.module('caac.opportunity-instances.service', [
    'caac.shared.conf.service'
  ])
  .factory('OpportunityInstancesService', ['$log', 'ConfService', '$http',
    function($log, ConfService, $http) {
      var logger = $log.getInstance('OpportunitiesService');
      var selectByTerm = function(term, range) {
        term = term || '';

        logger.info('attempting to retrieve opportunity instances related to "' + term + '" from backend');

        if (range && !isNaN(range.stop) && !isNaN(range.start)) {
          var rangeFilter = '?start=' + range.start + '&end=' + range.stop;
          return $http.get(ConfService.get('API') + '/opportunity_instances/search/' + term.toLowerCase() + '.json' + rangeFilter);
        }

        var defaultRangeFilter = '?start=0&end=19';
        return $http.get(ConfService.get('API') + '/opportunity_instances/search/' + term.toLowerCase() + '.json' + defaultRangeFilter);
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