angular.module('caac.opportunities.controller', [
  'caac.shared.title.service',
  'caac.opportunities.service'
]).controller('OpportunitiesController', ['$log', '$routeParams', '$scope', 'TitleService', 'OpportunitiesService',
  function($log, $routeParams, $scope, TitleService, OpportunitiesService) {
    var self = $scope;
    var logger = $log.getInstance('OpportunitiesController');

    self.getOpportunityByUid = function() {
      var steps = {
        start: function() {
          logger.info('attempting to retrieve opportunity');
          self.loadingStatus++;
          return OpportunitiesService.selectOpportunityByUid($routeParams.uid);
        },

        results: function(res) {
          self.noResultsErr = !res || res.data.result.length === 0 ?
            'No opportunities' : '';

          logger.info('showing opportunity');
          self.opportunity = res.data.result;

          return;
        },

        error: function(e) {
          logger.error('can\'t retrieve opportunity');
          self.opportunity = null;
          self.noResultsErr = e.data.err;
        },

        done: function() {
          self.loadingStatus--;
        }
      };

      steps.start()
        .then(steps.results)
        .catch(steps.error)
        .finally(steps.done);
    };

    self.init = function() {
      TitleService.set('Opportunities');
      self.loadingStatus = 0;
      self.getOpportunityByUid();
    };

    self.init();
  }
]);