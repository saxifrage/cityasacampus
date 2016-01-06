angular.module('caac.users.password.reset-form.directive', [
  'caac.users.auth.service',
])
  .directive('passwordReset', function () {
    return {
      restrict: 'E',
      template: '' +
      'todo... :)',
      controller: ['$scope', 'AuthService', function ($scope, AuthService) {
        var self = $scope;

        self.passwordResetHandler = function () {

        };
      }]
    };
  });