angular.module('caac.topics.service', [
    'caac.shared.conf.service'
  ])
  .factory('TopicsService', ['ConfService', '$http', function(ConfService, $http) {
    var selectTopics = function() {
      return $http.get(ConfService.get('API') + '/topics' + '.json');
    };

    return {
      selectTopics: selectTopics
    };
  }]);