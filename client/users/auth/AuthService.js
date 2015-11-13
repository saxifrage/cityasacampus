angular.module('caac.users.auth.service', [])
  .factory('AuthService', ['$auth',
    function($auth) {
      var attemptLogin = function(loginPayload) {
        return $auth.submitLogin(loginPayload);
      };

      var logout = function() {

      };

      return {
        attemptLogin: attemptLogin,
        logout: logout
      };
    }
  ]);
