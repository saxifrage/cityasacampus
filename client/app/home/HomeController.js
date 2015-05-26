angular.module('caac.home.controller', [
  'caac.shared.title.service',
  'caac.shared.navbar.directive',
]).controller('HomeController', ['$scope', 'TitleService',
  function(
    $scope, TitleService) {
    var self = $scope;

    self.init = function() {
      TitleService.set('Home');
    };

    self.init();
  }
]);