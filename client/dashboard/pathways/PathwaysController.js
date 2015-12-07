angular.module('caac.dashboard.pathways.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'dndLists'
]).controller('PathwaysController', ['$log', '$scope', 'TitleService',
  function($log, $scope, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('PathwaysController');

    TitleService.set('Pathways - Dashboard');
    logger.info('loading pathways interface');

    self.library = [ {label: 'Opportunity'}
                   , {label: 'Instances'}
                   , {label: 'Go'}
                   , {label: 'Here'}
                    ]
  }
]);
