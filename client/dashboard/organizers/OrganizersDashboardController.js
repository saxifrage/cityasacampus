angular.module('caac.dashboard.organizers.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'caac.organizers.service',
]).controller('OrganizersDashboardController', ['$log', '$scope', 'TitleService',
    'OrganizersService',
  function($log, $scope, TitleService, OrganizersService) {
    var self = $scope;
    var logger = $log.getInstance('OrganizersDashboardController');
    TitleService.set('Organizers Dashboard');

    self.comingSoon= function() {
      alert('Coming soon!');
    };
    self.path = OrganizersService.path;
  }
]);
