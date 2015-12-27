angular.module('caac.users.password.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'caac.users.password.reset-request-form.directive',
  'caac.users.password.reset-form.directive',
]).controller('PasswordController', ['$log', '$scope', 'TitleService', '$routeParams',
  function ($log, $scope, TitleService, $routeParams) {
    var self = $scope;
    var logger = $log.getInstance('PasswordController');

    self.showResetForm = false;

    self.construct = function () {
      TitleService.set('Password');
      self.determineResetFormVisibility();
    };

    // Looks at the query string param value that comes from the
    // password reset request email link
    self.determineResetFormVisibility = function () {
      self.showResetForm = ($routeParams.allow_reset &&
                            $routeParams.allow_reset === 'yes');
    };

    self.construct();
  }
]);