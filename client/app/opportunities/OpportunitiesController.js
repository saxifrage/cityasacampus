angular.module('caac.opportunities.controller', [
  'caac.shared.title.service',
  'caac.opportunities.service'
]).controller('OpportunitiesController', ['$routeParams', '$scope', 'TitleService', 'OpportunitiesService',
  function($routeParams, $scope, TitleService, OpportunitiesService) {
    var self = $scope;

    self.getOpportunityByUid = function() {
      var steps = {
        start: function() {
          self.loadingStatus++;
          return OpportunitiesService.selectOpportunityByUid($routeParams.uid);
        },

        results: function(res) {
          self.noResultsErr = !res || res.data.result.length === 0 ?
            'No opportunities' : '';

          self.opportunity = res.data.result;

          return;
        },

        error: function(e) {
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