angular.module('caac.explore.controller', [
  'caac.shared.jquery.service',
  'caac.shared.title.service',
  'caac.shared.conf.service',
  'caac.shared.loader.directive',
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.explore.topics.directive',
  'caac.explore.cards.directive',
  'caac.opportunities.service'
]).controller('ExploreController', ['$routeParams', '$rootScope', '$scope', 'jQueryService', 'TitleService', 'ConfService',
  'OpportunitiesService', '$timeout', '$window', '$location',
  function(
    $routeParams, $rootScope, $scope, jQueryService, TitleService, ConfService, 
    OpportunitiesService, $timeout, $window, $location) {
    var self = $scope;

    self.setSearchContext = function() {
      var listenForIncomingSearches = function() {
        $rootScope.$on('explore-search', function(events, term) {
          self.getOpportunitiesByTopic(term);
        });
      };

      var updateSearchTermFromParam = function() {
        var assign = function() {
          var tmpModel = jQueryService('.search input[type="text"]').attr('ng-model');
          self[tmpModel] = term;
          self.$apply();
        };

        $timeout(function() {
          assign();
        }, 10);
      };

      var getRouteSearchParam = function() {
        if ($routeParams.term) {
          updateSearchTermFromParam();
          return $routeParams.term;
        }

        return;
      };

      listenForIncomingSearches();
      var term = getRouteSearchParam();

      self.getOpportunitiesByTopic(term);
    };

    self.setTopicsList = function() {
      self.topics = ConfService.get('TOPICS'); //panel on the left
    };

    self.getOpportunitiesByTopic = function(term, options) {
      var steps = {
        start: function(term, options) {
          self.loadingStatus++;
          return OpportunitiesService.selectOpportunitiesByTopic(term, options);
        },

        results: function(res) {
          self.noResultsErr = !res || res.data.length === 0 ?
            'No results' : '';

          if (options && options.start && options.stop) {
            angular.forEach(res.data, function(v) {
              self.opportunities.push(v);
            });
          } else {
            self.opportunities = res.data;
          }

          return;
        },

        error: function(e) {
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
      self.setSearchContext();
    };

    self.init();
  }
]);