angular.module('caac.users.login.controller', [
  'caac.shared.title.service',
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.users.login-form.directive',
]).controller('LoginController', ['$log', '$scope', 'TitleService',
  function($log, $scope, TitleService) {
    var self = $scope;

    var logger = $log.getInstance('LoginController');

    self.construct = function() {
        TitleService.set('Login');
    };

    self.construct();
  }
]);