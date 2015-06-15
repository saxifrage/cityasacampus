angular.module('caac.home.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.title.service',
]).controller('HomeController', ['$scope', 'TitleService',
  function($scope, TitleService) {
    var self = $scope;

    self.init = function() {
      TitleService.set('Home');
    };

    self.init();
  }
]);