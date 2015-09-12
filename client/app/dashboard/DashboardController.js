angular.module('caac.dashboard.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
]).controller('DashboardController', ['$log', '$scope', 'TitleService',
  function($log, $scope, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('DashboardController');

    self.studentNotice = function() {
      alert('Learner accounts are not yet available. For now, just browse opportunities or explore our map!');
    };

    self.init = function() {
      TitleService.set('Dashboard');

      logger.info('showing current dashboard links');
    };

    self.init();
  }
]);