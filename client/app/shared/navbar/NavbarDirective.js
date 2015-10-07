angular.module('caac.shared.navbar.directive', [
    'caac.shared.jquery.service'
  ])
  .controller('NavbarController', ['$scope', '$location',
    function($scope, $location, jQueryService) {
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
  .directive('navbar', ['$rootScope', '$location', 'jQueryService',
    function($rootScope, $location, jQueryService) {
      return {
        restrict: 'E',
        templateUrl: 'shared/navbar/NavbarView.html',
        controller: 'NavbarController'
      };
    }
  ]);