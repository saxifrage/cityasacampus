angular.module('caac.dashboard.pathways.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'dndLists'
]).controller('PathwaysController', ['$log', '$scope', '$http', 'TitleService',
  function($log, $scope, $http, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('PathwaysController');

    TitleService.set('Pathways - Dashboard');
    logger.info('loading pathways interface');

    $http.get('opportunity_instances.json').then(function(res){ self.library = res.data.result; });
  }
]);
