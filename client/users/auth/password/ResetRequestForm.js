angular.module('caac.users.password.reset-request-form.directive', [
  'caac.users.auth.service',
])
  .directive('passwordResetRequest', function () {
    return {
      restrict: 'E',
      template: '' +
      '<form class="form" role="form" ng-submit="passwordResetRequestHandler()" ng-init="passwordResetRequestForm = {}">' +
      '  <input type="email" name="email" ng-model="passwordResetRequestForm.email" required="required" placeholder="Your email">' +
      '  <button type="submit">Request Password Reset</button>' +
      '</form>',
      controller: ['$scope', 'AuthService', function ($scope, AuthService) {
        var self = $scope;

        self.passwordResetRequestHandler = function () {
          AuthService.requestPasswordReset(self.passwordResetRequestForm)
            .then(function (res) {
              if (res && res.data && res.data.message) alert(res.data.message);
            })
            .catch(function (res) {
              if (res && res.data && res.data.errors) alert(res.data.errors[0]);
            });
        };
      }]
    };
  });