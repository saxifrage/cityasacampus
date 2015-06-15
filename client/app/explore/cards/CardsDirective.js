angular.module('caac.explore.cards.directive', [
  'caac.shared.jquery.service'
]).directive('exploreCards', ['jQueryService',
  function(jQueryService) {
    return {
      restrict: 'E',
      templateUrl: 'explore/cards/CardsView.html',
      link: function(scope, elem) {
        var self = scope;

        self.seeMore = function() {
          self.getOpportunitiesByTerm(jQueryService('.search').val(), {
            start: self.opportunities.length,
            stop: self.opportunities.length + 20
          });
        };
      }
    };
  }
]);