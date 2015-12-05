angular.module('caac.users.password-reset.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
]).controller('PasswordResetController', function($log, $scope, $auth, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('PasswordResetController');

    self.construct = function() {
      TitleService.set('PasswordReset');
    };

    self.handleResetBtnClick = function() {
      $auth.requestPasswordReset($scope.passwordResetForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };

    self.construct();
  }
);
