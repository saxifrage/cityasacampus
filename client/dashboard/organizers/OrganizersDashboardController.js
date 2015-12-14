angular.module('caac.dashboard.organizers.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
]).controller('OrganizersDashboardController', ['$log', '$scope', 'TitleService',
  function($log, $scope, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('OrganizersDashboardController');

    TitleService.set('Organizers Dashboard');

    self.comingSoon= function() {
      alert('Coming soon!');
    };
  }
]);
