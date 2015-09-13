angular.module('caac.explore.controller', [
  'caac.shared.loader.directive',
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.explore.topics.directive',
  'caac.explore.cards.directive',
  'caac.shared.jquery.service',
  'caac.shared.title.service',
  'caac.shared.conf.service',
  'caac.opportunity-instances.service',
  'caac.topics.service'
]).controller('ExploreController', ['$rootScope', '$log', '$timeout', '$location', '$routeParams', '$scope', 'TitleService', 'ConfService', 'OpportunityInstancesService', 'TopicsService',
  function($rootScope, $log, $timeout, $location, $routeParams, $scope, TitleService, ConfService, OpportunityInstancesService, TopicsService) {
    var self = $scope;
    var logger = $log.getInstance('ExploreController');

    self.getOpportunityInstancesByTerm = function(term, page) {
      var steps = {
        start: function(term, page) {
          logger.info('attempting to retrieve opportunity instances');

          self.loadingStatus++;
          return OpportunityInstancesService.selectByTerm(term, page);
        },

        results: function(res) {
          self.noResultsErr = !res || res.data.length === 0 ?
            'No results' : '';

          if (res.data.result.length === 0) {
            logger.warn('paged to end of resultset');
            self.reachedMaxEntries = true;
          }

          if (page) {
            logger.info('appending ' + res.data.result.length + ' more card(s)');
            angular.forEach(res.data.result, function(v) {
              self.opportunityInstances.push(v);
            });
          } else {
            logger.info('showing ' + res.data.result.length + ' card(s)');
            self.opportunityInstances = res.data.result;
          }

          return;
        },

        error: function(e) {
          logger.error('error retrieving opportunity instances');

          self.opportunityInstances = [];
          self.noResultsErr = e.data.err;
        },

        done: function() {
          self.loadingStatus--;
        }
      };

      steps.start(term, page)
        .then(steps.results)
        .catch(steps.error)
        .finally(steps.done);
    };

    self.setTopicsList = function() {
      var steps = {
        start: function() {
          logger.info('attempting to retrieve topics');

          self.loadingStatus++;
          return TopicsService.selectTopics();
        },

        results: function(res) {
          self.topics = res.data.topics || [];
          logger.info('showing ' + self.topics.length + ' topic(s)');
          return;
        },

        error: function(e) {
          logger.error('error retrieving topics');
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

    self.goToOpportunityInstance = function(uid) {
      if (uid) {
        $location.path('opportunity-instances/' + uid);
      }
    };

    self.init = function() {
      TitleService.set('Explore');
      self.loadingStatus = 0;
      self.opportunityInstances = [];
      self.city = ConfService.get('CITY');

      self.setTopicsList();

      if ($routeParams.term) {
        logger.info('updating navbar search input to say "' + $routeParams.term + '"');
        self.term = $routeParams.term;
        self.getOpportunityInstancesByTerm(self.term);
      }
    };

    self.init();
  }
]);