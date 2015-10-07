angular.module('caac.opportunity-instances.controller', [
  'caac.shared.title.service',
  'caac.opportunity-instances.service'
]).controller('OpportunityInstancesController', ['$log', '$routeParams', '$scope', 'TitleService', 'OpportunityInstancesService', '$location',
  function($log, $routeParams, $scope, TitleService, OpportunityInstancesService, $location) {
    var self = $scope;
    var logger = $log.getInstance('OpportunityInstancesController');

    self.loadingStatus = 0;
    self.opportunityInstance = null;

    self.construct = function() {
      TitleService.set('Opportunity Instances');
      self.getByUid();
    };

    self.getByUid = function() {
      logger.info('attempting to retrieve an opportunity instance');

      self.loadingStatus++;
      OpportunityInstancesService.selectByUid($routeParams.uid)
        .then(function(res) {
          if (!res || !res.data || !res.data.result || res.data.result.length === 0) $location.path('/explore');

          logger.info('showing opportunity instance');
          self.opportunityInstance = res.data.result;
          self.determineRegistrationStatus();
        })
        .catch(function(e) {
          logger.error('can\'t retrieve opportunity instance');
          self.opportunityInstance = null;
          $location.path('/explore');
        })
        .finally(function() {
          self.loadingStatus--;
        });
    };

    //this will make register btn gray/inactive
    self.determineRegistrationStatus = function() {
      self.registrationStatus = false;

      if (!self.opportunityInstance || !self.opportunityInstance.registration_deadline) return;

      if (moment().unix() >= moment(self.opportunityInstance.registration_deadline).unix()) {
        self.registrationStatus = true;
      }
    };

    self.construct();
  }
]);