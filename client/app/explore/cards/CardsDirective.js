angular.module('caac.explore.cards.directive', [

]).directive('exploreCards', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'explore/cards/CardsView.html',
      link: function(scope, elem) {
        var self = scope;

        self.seeMore = function() {
          self.getOpportunityInstancesByTerm(self.term || '', {
            start: self.opportunityInstances.length,
            stop: self.opportunityInstances.length + 20
          });
        };
      }
    };
  }
]);