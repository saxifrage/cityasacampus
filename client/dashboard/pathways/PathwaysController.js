angular.module('caac.dashboard.pathways.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
]).controller('PathwaysController', ['$log', '$scope', 'TitleService',
  function($log, $scope, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('PathwaysController');

    self.construct = function() {
      TitleService.set('Pathways - Dashboard');

      logger.info('loading pathways interface');
    };

    self.construct();
  }
]);
