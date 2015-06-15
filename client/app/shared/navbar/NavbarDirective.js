angular.module('caac.shared.navbar.directive', [
  'caac.shared.jquery.service'
]).directive('navbar', ['$rootScope', '$location', 'jQueryService',
  function($rootScope, $location, jQueryService) {
    return {
      restrict: 'E',
      templateUrl: 'shared/navbar/NavbarView.html',
      link: function(scope, elem) {
        var self = scope;

        self.setActivePage = function() {

        };

        //allows for <navbar search="false"></navbar>
        var setSearchBarVisibility = function() {
          var attr = jQueryService(elem[0]).attr('search');
          if (attr && attr.bool() === false) {
            jQueryService('.search').hide();
          }
        };

        self.textSearch = function(term) {
          $location.path('explore/' + term || '');
        };

        var init = function() {
          setSearchBarVisibility();
        };

        init();
      }
    };
  }
]);