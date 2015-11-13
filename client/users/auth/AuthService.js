angular.module('caac.users.auth.service', [])
  .factory('AuthService', ['$auth', '$location', '$window',
    function($auth, $location, $window) {
      var attemptLogin = function(loginPayload) {
        return $auth.submitLogin(loginPayload);
      };

      var attemptRegistration = function(registrationPayload) {
        return $auth.submitRegistration(registrationPayload);
      };

      var attemptUpdate = function(updatePayload) {
        return $auth.updateAccount(updatePayload);
      };

      var logout = function() {
        return $auth
          .signOut()
          .then(function() {
            //we're on home page, so hard refresh
            if ($location.path() === '/') $window.location.reload();

            $location.path('/');
          });
      };
 
      //returns promise where `then` callback means
      //the user is authenticated and `error` callback
      //means they are not.
      var isAuthenticated = function() {
        return $auth.validateUser();
      };

      return {
        attemptLogin: attemptLogin,
        attemptRegistration: attemptRegistration,
        attemptUpdate: attemptUpdate,
        logout: logout,
        isAuthenticated: isAuthenticated,
      };
    }
  ]);
