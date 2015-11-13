angular.module('caac.users.login-form.directive', [
    'caac.users.auth.service',
  ]).controller('LoginFormController', ['$log', '$scope', '$location', 'AuthService',
    function($log, $scope, $location, AuthService) {
      var self = $scope;
      var logger = $log.getInstance('LoginController');
      var loginForm = {};

      self.construct = function() {
      };

      self.handleLoginBtnClick = function() {
        AuthService.attemptLogin(self.loginForm)
          .then(function(resp) {
            $location.url('dashboard');
          })
          .catch(function(resp) {
            self.loginForm.password = "";
            if (resp.reason === 'unauthorized') {
              self.loginForm.error = 'Invalid Credentials. Please try again.';
            }
          });
      };

      self.construct();
    }
  ])
  .directive('loginForm', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'users/auth/login/LoginForm.html',
        controller: 'LoginFormController'
      };
    }
  ]);
