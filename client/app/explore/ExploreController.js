angular.module('caac.explore.controller', [
  'caac.shared.loader.directive',
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.explore.topics.directive',
  'caac.explore.cards.directive',
  'caac.shared.jquery.service',
  'caac.shared.title.service',
  'caac.shared.conf.service',
  'caac.opportunities.service',
  'caac.topics.service'
]).controller('ExploreController', ['$log', '$timeout', '$location', '$routeParams', '$scope', 'TitleService', 'ConfService', 'OpportunitiesService', 'TopicsService',
  function($log, $timeout, $location, $routeParams, $scope, TitleService, ConfService, OpportunitiesService, TopicsService) {
    var self = $scope;
    var logger = $log.getInstance('ExploreController');

    self.getOpportunitiesByTerm = function(term, options) {
      var steps = {
        start: function(term, options) {
          logger.info('attempting to retrieve opportunities');

          self.loadingStatus++;
          return OpportunitiesService.selectOpportunitiesByTerm(term, options);
        },

        results: function(res) {
          self.noResultsErr = !res || res.data.length === 0 ?
            'No results' : '';

          if (options && options.start && options.stop) {
            logger.info('appending ' + res.data.result.length + ' more card(s)');
            angular.forEach(res.data.result, function(v) {
              self.opportunities.push(v);
            });
          } else {
            logger.info('showing ' + res.data.result.length + ' card(s)');
            self.opportunities = res.data.result;
          }

          return;
        },

        error: function(e) {
          logger.error('error retrieving opportunities');

          self.opportunities = [];
          self.noResultsErr = e.data.err;
        },

        done: function() {
          self.loadingStatus--;
        }
      };

      steps.start(term, options)
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

    self.goToOpportunity = function(uid) {
      if (uid) {
        $location.path('opportunities/' + uid);
      }
    };

    self.init = function() {
      TitleService.set('Explore');
      self.loadingStatus = 0;
      self.opportunities = [];
      self.city = ConfService.get('CITY');

      self.setTopicsList();

      if ($routeParams.term) {
        logger.info('updating navbar search input to say "' + $routeParams.term + '"');
        self.term = $routeParams.term;
        self.getOpportunitiesByTerm(self.term);
      }
    };

    self.init();
  }
]);