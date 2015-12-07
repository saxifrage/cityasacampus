angular.module('caac.dashboard.map.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'dndLists'
]).controller('MapController', ['$log', '$scope', '$http', 'TitleService',
  function($log, $scope, $http, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('MapController');

    TitleService.set('Map - Dashboard');
    logger.info('loading map interface');

    self.topics = [];
    self.topic = [];
    self.pathway = [];
    $http.get('opportunity_instances.json').then(function(res){ self.library = res.data.result; });
  }
]);
