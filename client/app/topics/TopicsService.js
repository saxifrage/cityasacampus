angular.module('caac.topics.service', [
  ])
  .factory('TopicsService', ['$http',
    function($http) {
      var selectTopics = function() {
        return $http.get('/topics' + '.json');
      };

      return {
        selectTopics: selectTopics
      };
    }
  ]);