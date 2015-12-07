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

    self.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        self.models.lists.A.push({label: "Item A" + i});
        self.models.lists.B.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    self.$watch('models', function(model) {
        self.modelAsJson = angular.toJson(model, true);
    }, true);

  }
]);
