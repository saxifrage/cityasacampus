angular.module('caac.explore.topics.directive', [
    'caac.topics.service',
  ])
  .controller('ExploreTopicsController', ['$scope', '$log', 'TopicsService', '$location',
    function($scope, $log, TopicsService, $location) {

      var logger = $log.getInstance('ExploreTopicsController');
      var self = $scope;

      self.topics = [];

      self.construct = function() {
        self.setTopicsList();
      };

      self.setTopicsList = function() {
        logger.info('attempting to retrieve topics');

        TopicsService.selectTopics()
          .then(function(res) {
            self.topics = res.data.topics || [];
            logger.info('showing ' + self.topics.length + ' topic(s)');
          })
          .catch(function(e) {
            logger.error('error retrieving topics');
          });
      };

      self.topicSearch = function(term) {
        $location.path('explore/' + term || '');
      };

      self.construct();
    }
  ])
  .directive('exploreTopics', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'explore/topics/TopicsView.html',
        controller: 'ExploreTopicsController'
      };
    }
  ]);