angular.module('caac.opportunities.service', [
    'caac.shared.conf.service'
  ])
  .factory('OpportunitiesService', ['$log', 'ConfService', '$http',
    function($log, ConfService, $http) {
      var logger = $log.getInstance('OpportunitiesService');
      var selectOpportunitiesByTerm = function(term, range) {
        term = term || '';

        logger.info('attempting to retrieve opportunity_instances related to "' + term + '" from backend');

        if (range && !isNaN(range.stop) && !isNaN(range.start)) {
          var rangeFilter = '?start=' + range.start + '&end=' + range.stop;
          return $http.get(ConfService.get('API') + '/opportunity_instances/search/' + term.toLowerCase() + '.json' + rangeFilter);
        }

        var defaultRangeFilter = '?start=0&end=19';
        return $http.get(ConfService.get('API') + '/opportunity_instances/search/' + term.toLowerCase() + '.json' + defaultRangeFilter);
      };

      var selectOpportunityByUid = function(uid) {
        if (uid) {
          logger.info('attempting to retrieve opportunity_instance with uid of "' + uid + '" from backend');

          return $http.get(ConfService.get('API') + '/opportunity_instances/' + uid + '.json');
        }

        logger.warn('no uid supplied');
      };

      return {
        selectOpportunityByUid: selectOpportunityByUid,
        selectOpportunitiesByTerm: selectOpportunitiesByTerm
      };
    }
  ]);