angular.module('caac.shared.navbar.directive', [
    'caac.users.auth.service'
  ])
  .controller('NavbarController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {
      var self = $scope;

      self.showLogout = false;

      var construct = function() {
        self.showLogoutHandler();
      };

      self.showLogoutHandler = function() {
        AuthService.isAuthenticated()
          .then(function() {
            self.showLogout = true;
          })
          .catch(function() {
            self.showLogout = false;
          });
      };

      self.setActivePage = function() {};

      self.textSearch = function(term) {
        if (!term) return;
        $location.path('explore/' + term);
      };

      self.logout = function() {
        AuthService.logout();
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