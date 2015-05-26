angular.module('caac.explore.topics.directive', [
  'caac.shared.jquery.service'
]).directive('exploreTopics', ['jQueryService', '$window', '$timeout', function(jQueryService, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'explore/topics/TopicsView.html',
    link: function(scope, elem) {
      scope.topicSearch = function(term) {
        $timeout(function() {
          var tmpModel = jQueryService('.search input[type="text"]').attr('ng-model');
          scope[tmpModel] = term;
          scope.$apply();
        }, 10);

        scope.getOpportunitiesByTopic(term);
      };
    }
  };
}]);