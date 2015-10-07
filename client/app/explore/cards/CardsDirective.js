angular.module('caac.explore.cards.directive', [
    'caac.opportunity-instances.service',
  ])
  .controller('ExploreCardsController', ['$scope', '$log', 'OpportunityInstancesService',
    function($scope, $log, OpportunityInstancesService) {

      var logger = $log.getInstance('ExploreCardsController');
      var self = $scope;

      self.curPage = 1;
      self.loadingStatus = 0;
      self.reachedMaxEntries = false;
      self.opportunityInstances = [];
      //self.term;

      self.construct = function() {
        self.getOpportunityInstancesByTerm();
      };

      self.goToOpportunityInstance = OpportunityInstancesService.goToOpportunityInstance;

      self.seeMore = function() {
        self.getOpportunityInstancesByTerm(self.term || '', ++self.curPage);
      };

      self.getOpportunityInstancesByTerm = function() {
        logger.info('attempting to retrieve opportunity instances');

        self.loadingStatus++;

        OpportunityInstancesService.selectByTerm(self.term, self.curPage)
          .then(function(res) {
            self.noResultsErr = 
              !res || !res.data || !res.data.result || res.data.result.length === 0 
                ? 'No results' 
                : '';

            if (res.data.result.length === 0) {
              logger.warn('paged to end of resultset');
              self.reachedMaxEntries = true;
            }

            if (self.curPage) {
              logger.info('appending ' + res.data.result.length + ' more card(s)');
              angular.forEach(res.data.result, function(v) {
                self.opportunityInstances.push(v);
              });
            } else {
              logger.info('showing ' + res.data.result.length + ' card(s)');
              self.opportunityInstances = res.data.result;
            }
          })
          .catch(function(e) {
            logger.error('error retrieving opportunity instances');

            self.opportunityInstances = [];
            self.noResultsErr = e.data.err;
          })
          .finally(function() {
            self.loadingStatus--;
          });
      };

      self.construct();
    }
  ])
  .directive('exploreCards', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'explore/cards/CardsView.html',
        scope: {
          term: '='
        },
        controller: 'ExploreCardsController'
      };
    }
  ]);