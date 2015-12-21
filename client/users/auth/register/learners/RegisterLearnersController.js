angular.module('caac.users.register.learners.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.progress-indicator.directive',
  'caac.shared.title.service',
  'caac.users.auth.service',
  'caac.users.register-form.directive'
]).controller('RegisterLearnersController', ['$location', '$log', '$scope', 'AuthService', 'TitleService',
  function($location, $log, $scope, AuthService, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('RegisterLearnersController');

    self.construct = function() {
      TitleService.set('Register');
    };

    self.handleRegisterBtnClick = function() {
      AuthService.attemptRegistration(self.registrationForm)
        .then(function(resp) {
          $location.url('dashboard');
        })
        .catch(function(resp) {
          self.registrationForm.password = self.registrationForm.password_confirmation = "";
          self.registrationForm.errors = resp.data.errors;
        });
    };

    self.construct();
  }
]);