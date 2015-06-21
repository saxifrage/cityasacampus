angular.module('caac.explore.topics.directive', [

]).directive('exploreTopics', ['$location',
  function($location) {
    return {
      restrict: 'E',
      templateUrl: 'explore/topics/TopicsView.html',
      link: function(scope, elem) {
        var self = scope;

        self.topicSearch = function(term) {
          $location.path('explore/' + term || '');
        };
      }
    };
  }
]);