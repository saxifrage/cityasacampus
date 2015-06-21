angular.module('caac.opportunity-instances.controller', [
  'caac.shared.title.service',
  'caac.opportunity-instances.service'
]).controller('OpportunityInstancesController', ['$log', '$routeParams', '$scope', 'TitleService', 'OpportunityInstancesService',
  function($log, $routeParams, $scope, TitleService, OpportunityInstancesService) {
    var self = $scope;
    var logger = $log.getInstance('OpportunityInstancesController');

    self.getByUid = function() {
      var steps = {
        start: function() {
          logger.info('attempting to retrieve an opportunity instance');
          self.loadingStatus++;
          return OpportunityInstancesService.selectByUid($routeParams.uid);
        },

        results: function(res) {
          self.noResultsErr = !res || res.data.result.length === 0 ?
            'No opportunity instances' : '';

          logger.info('showing opportunity instance');
          self.opportunityInstance = res.data.result;

          return;
        },

        error: function(e) {
          logger.error('can\'t retrieve opportunity instance');
          self.opportunityInstance = null;
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
      TitleService.set('Opportunity Instances');
      self.loadingStatus = 0;
      self.getByUid();
    };

    self.init();
  }
]);