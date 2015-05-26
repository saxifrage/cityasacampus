angular.module('caac', [
  'caac.explore.controller',
  'caac.home.controller',
  'caac.opportunities.controller',
  'ngRoute',
  'angular.filter'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/explore', {
    controller: 'ExploreController',
    templateUrl: 'explore/ExploreView.html'
  }).when('/explore/:term', {
    controller: 'ExploreController',
    templateUrl: 'explore/ExploreView.html'
  }).when('/opportunities/:uid', {
    controller: 'OpportunitiesController',
    templateUrl: 'opportunities/OpportunitiesView.html'
  }).when('/', {
    controller: 'HomeController',
    templateUrl: 'home/HomeView.html'
  });
}]);