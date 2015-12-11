angular.module('caac.dashboard.map.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'caac.opportunity-instances.service',
  'dndLists'
]).controller('MapController', ['$log', '$scope', 'TitleService', 'OpportunityInstancesService',
  function($log, $scope, TitleService, OpportunityInstancesService) {
    var self = $scope;
    var logger = $log.getInstance('MapController');

    TitleService.set('Map - Dashboard');
    logger.info('loading map interface');

    self.topics = [ { name: "Cheese"
                    , pathways: [{ name: "Cheddar"
                                 , resources: [ {name: "Mild"}
                                              , {name: "Sharp"}
                                              , {name: "Extra Sharp"}
                                               ]
                                  }]
                     }
                  , { name: "Bread"
                    , pathways: [ { name: "Mancini's"
                                  , resources: [ {name: "Loaf"}
                                               , {name: "Hoagie Sticks"}
                                               , {name: "Rolls"}
                                                ]
                                   }
                                , { name: "Breadworks"
                                  , resources: [ {name: "Wheat"}
                                               , {name: "Rye"}
                                               , {name: "Baguette"}
                                                ]
                                   }
                                 ]
                     }
                   ];

    self.currentTopic = null;
    self.selectTopic = function(topic) {
        self.currentTopic = topic;
    };

    self.currentPathway = null;
    self.selectPathway = function(pathway) {
        self.currentPathway = pathway;
    };

    OpportunityInstancesService.load(function(opportunity_instances){
        self.library = opportunity_instances;
    });
  }
]);
