angular.module('caac.explore.cards.directive', [

]).directive('exploreCards', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'explore/cards/CardsView.html',
      link: function(scope, elem) {
        var self = scope;

        self.curPage = 1;

        self.$on('REACHED_MAX_RESULTS', function() {
          self.reachedMaxEntries = true;
        });

        self.reachedMaxEntries = false;

        self.seeMore = function() {
          self.getOpportunityInstancesByTerm(self.term || '', ++self.curPage);
        };
      }
    };
  }
]);