angular.module('caac.shared.navbar.directive', [
  ])
  .controller('NavbarController', ['$scope', '$location',
    function($scope, $location) {
      var self = $scope;

      var construct = function() {

      };

      self.setActivePage = function() {};

      self.textSearch = function(term) {
        if (!term) return;
        $location.path('explore/' + term);
      };

      construct();
    }
  ])
  .directive('navbar', [function() {
    return {
      restrict: 'E',
      templateUrl: 'shared/navbar/NavbarView.html',
      controller: 'NavbarController'
    };
  }]);