angular.module('caac.dashboard.organizers.chooser.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'caac.organizers.service',
]).controller('OrganizersDashboardChooserController', ['$log', '$scope', 'TitleService',
    'OrganizersService',
  function($log, $scope, TitleService, OrganizersService) {
    var self = $scope;
    var logger = $log.getInstance('DashboardController');

    TitleService.set('Choose an Organizer');
    logger.info('showing organizer listing');

    OrganizersService.selectOrganizers().then(function(res) {
        self.organizers = res.data.organizers;
    });
  }
]);
