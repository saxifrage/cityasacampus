angular.module('caac.explore.cards.directive', [
  'caac.shared.jquery.service'
]).directive('exploreCards', ['jQueryService',
  function(jQueryService) {
    return {
      restrict: 'E',
      templateUrl: 'explore/cards/CardsView.html',
      link: function(scope, elem) {
        scope.seeMore = function() {
          scope.getOpportunitiesByTerm(jQueryService('.search').val(), {
            start: scope.opportunities.length,
            stop: scope.opportunities.length + 20
          });
        };
      }
    };
  }
]);