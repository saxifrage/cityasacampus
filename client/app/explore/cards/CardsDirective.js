angular.module('caac.explore.cards.directive', [

]).directive('exploreCards', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'explore/cards/CardsView.html',
      link: function(scope, elem) {
        var self = scope;

        self.seeMore = function() {
          self.getOpportunitiesByTerm(self.term || '', {
            start: self.opportunities.length,
            stop: self.opportunities.length + 20
          });
        };
      }
    };
  }
]);