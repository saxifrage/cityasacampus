if (!(Modernizr.borderradius &&
    Modernizr.backgroundsize &&
    Modernizr.boxshadow &&
    Modernizr.csstransforms &&
    Modernizr.fontface &&
    Modernizr.hsla &&
    Modernizr.hashchange &&
    Modernizr.input &&
    Modernizr.opacity &&
    Modernizr.rgba &&
    Modernizr.svg &&
    Modernizr.svgclippaths &&
    Modernizr.sessionstorage)) {
  window.location = 'http://www.old-browser.org/en-us/?referer=' + window.location.host;
} else {
  angular.module('caac', [
    'caac.dashboard.controller',
    'caac.explore.controller',
    'caac.home.controller',
    'caac.opportunity-instances.controller',
    'caac.users.login.controller',
    'caac.users.auth.service',
    'caac.users.register.learners.controller',
    'caac.users.register.organizers.controller',
    'ngRoute',
    'ng-token-auth',
    'angular.filter'
  ]).config(function($authProvider, $routeProvider) {
    $authProvider.configure({
      apiUrl: '/api/v1',
      tokenValidationPath: '/auth/validate_token',
      storage: 'localStorage'
    });

    $routeProvider.when('/explore', {
      controller: 'ExploreController',
      templateUrl: 'explore/ExploreView.html'
    }).when('/explore/:term', {
      controller: 'ExploreController',
      templateUrl: 'explore/ExploreView.html'
    }).when('/opportunity-instances/:uid', {
      controller: 'OpportunityInstancesController',
      templateUrl: 'opportunity-instances/OpportunityInstancesView.html'
    }).when('/dashboard', {
      controller: 'DashboardController',
      templateUrl: 'dashboard/DashboardView.html'
    }).when('/users/login', {
      controller: 'LoginController',
      templateUrl: 'users/auth/login/LoginView.html'
    }).when('/users/register', {
      templateUrl: 'users/auth/register/RegisterView.html'
    }).when('/users/register/learners', {
      controller: 'RegisterLearnersController',
      templateUrl: 'users/auth/register/learners/RegisterLearnersView.html'
    }).when('/users/register/organizers', {
      controller: 'RegisterOrganizersController',
      templateUrl: 'users/auth/register/organizers/RegisterOrganizersView.html'
    }).when('/', {
      controller: 'HomeController',
      templateUrl: 'home/HomeView.html'
    });
  }).run(['$log', '$rootScope', 'AuthService', '$location',
    function($log, $rootScope, AuthService, $location) {

      //route auth checker
      $rootScope.$on('$routeChangeStart', function(event, current, previous) {
        if (current && current.$$route) {
          if (current.$$route.originalPath.indexOf('dashboard') === -1) return;

          AuthService.isAuthenticated()
            .catch(function() {
              event.preventDefault();
              $location.path('/users/login');
            });
        }
      });

      $log.getInstance = function(context) {
        return {
          info: enhanceLogging('INFO', $log.info, context),
          warn: enhanceLogging('WARN', $log.warn, context),
          debug: enhanceLogging('DEBUG', $log.debug, context),
          error: enhanceLogging('ERROR', $log.error, context)
        };
      };

      function enhanceLogging(type, loggingFunc, context) {
        return function() {
          if (['localhost', '127.0.0.1'].indexOf(window.document.location.hostname) > -1) {
            var modifiedArguments = [].slice.call(arguments);
            modifiedArguments[0] = ['[' + type + '] ' + moment().format('YYYY-MM-DD HH:mm:ss') + ' - ' + context + ' - '] + modifiedArguments[0];
            loggingFunc.apply(null, modifiedArguments);
          }

          //otherwise, we're on production (don't show any logs)
        };
      }
    }
  ]);
}
