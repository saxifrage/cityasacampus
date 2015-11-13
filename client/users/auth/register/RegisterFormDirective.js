angular.module('caac.users.register-form.directive', [])
  .directive('registerForm', function() {
    return {
      restrict: 'E',
      scope: {
        model: '=ngModel',
        submitHandler: '&',
        showSubmitButton: '='
      },
      templateUrl: 'users/auth/register/RegisterForm.html'
    };
  });
