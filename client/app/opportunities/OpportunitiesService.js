angular.module('caac.opportunities.service', [
    'caac.shared.conf.service'
  ])
  .factory('OpportunitiesService', ['ConfService', '$http', function(ConfService, $http) {
    var selectOpportunitiesByTopic = function(term, range) {
      term = term || '';

      if (range && !isNaN(range.stop) && !isNaN(range.start)) {
        var rangeFilter = '?start=' + range.start + '&end=' + range.stop;
        return $http.get(ConfService.get('API') + '/opportunity_instance/topic/' + term.toLowerCase() + '.json' + rangeFilter);
      }

      var defaultRangeFilter = '?start=0&end=19';
      return $http.get(ConfService.get('API') + '/opportunity_instance/topic/' + term.toLowerCase() + '.json' + defaultRangeFilter);
    };

    var selectOpportunityByUid = function(uid) {
      if (uid) {
        return $http.get(ConfService.get('API') + '/opportunity_instance/' + uid + '.json');
      }
    };

    return {
      selectOpportunityByUid: selectOpportunityByUid,
      selectOpportunitiesByTopic: selectOpportunitiesByTopic
    };
  }]);
