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


    // Create
    // ======

    self.addTopic = function() {
       alert("Add topic ...");
    };

    self.addPathway = function() {
       alert("Add pathway ...");
    };


    // Read
    // ====

    self.selectTopic = function(topic) {
      self.currentTopic = topic;
      self.selectPathway(topic.pathways[0]);
    };

    self.selectPathway = function(pathway) {
      self.currentPathway = pathway;
    };


    // Update
    // ======

    // ???


    // Delete
    // ======

    self.deleteTopic = function(topic) {
       alert("Delete " + topic.name);
    };

    self.deletePathway = function(pathway) {
       alert("Delete " + pathway.name);
    };


    // Initialize
    // ==========

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
    self.selectTopic(self.topics[0]);

    OpportunityInstancesService.load(function(opportunity_instances){
      self.library = opportunity_instances;
    });
  }
]);
