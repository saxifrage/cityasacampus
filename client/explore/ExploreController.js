angular.module('caac.explore.controller', [
  'caac.shared.loader.directive',
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.explore.topics.directive',
  'caac.explore.cards.directive',
  'caac.shared.title.service',
]).controller('ExploreController', ['$log', '$routeParams', '$scope', 'TitleService',
  function($log, $routeParams, $scope, TitleService) {
    var self = $scope;

    var logger = $log.getInstance('ExploreController');

    self.construct = function() {
      TitleService.set('Explore');

      logger.info('updating navbar search input to say "' + $routeParams.term + '"');
      self.term = $routeParams.term || '';
    };

    self.construct();
  }
]);