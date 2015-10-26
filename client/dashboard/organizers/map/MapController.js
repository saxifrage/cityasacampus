angular.module('caac.dashboard.organizers.map.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'caac.grids.service',
  'caac.pathways.service',
  'caac.opportunity-instances.service',
  'caac.organizers.service',
  'dndLists'
]).controller('MapController', ['$log', '$scope', 'TitleService', 'GridsService',
    'PathwaysService', 'OpportunityInstancesService', 'OrganizersService',
  function($log, $scope, TitleService, GridsService, PathwaysService,
      OpportunityInstancesService, OrganizersService) {
    var self = $scope;
    var logger = $log.getInstance('MapController');
    var organizerId = OrganizersService.organizerId();

    TitleService.set('Map - Dashboard');
    logger.info('loading map interface');


    // Insert
    // ======

    self.insertGrid = function() {
      var name = prompt("Okay! Let's add a grid to your map. What name should it have?");
      GridsService.insert(organizerId, name).then(function(res) {
        self.grids.push(res.data.grid);
        self.selectGrid(res.data.grid);
      });
    };

    self.insertPathway = function(grid) {
      var name = prompt("Okay! Let's add a pathway to your grid. What name should it have?");
      PathwaysService.insert(grid, name).then(function(res) {
        grid.pathways.push(res.data.pathway);
        self.selectPathway(res.data.pathway);
      });
    };


    // Select
    // ======

    self.selectGrid = function(grid) {
      self.currentGrid = grid;
      self.selectPathway(grid.pathways[0]);
    };

    self.selectPathway = function(pathway) {
      self.currentPathway = pathway;
    };


    // Update
    // ======

    self.editGrid = function(grid) {
       alert("Edit" + grid.name);
    };

    self.editPathway = function(pathway) {
       alert("Edit " + pathway.name);
    };


    // Delete
    // ======

    self.deleteGrid = function(grid) {
       alert("Delete " + grid.name);
    };

    self.deletePathway = function(pathway) {
       alert("Delete " + pathway.name);
    };


    // Assignment
    // ==========

    self.assignOrReorderNode = function(node) {
        OpportunityInstancesService.assignOrReorder(node);
    };

    self.unassignNode = function(node) {
        OpportunityInstancesService.unassign(node);
    };


    // Initialize
    // ==========

    GridsService.selectAll(organizerId).then(function(res) {
      self.grids = res.data.grids;
      if (self.grids.length) {
          self.selectGrid(self.grids[0]);
      }
    });

    OpportunityInstancesService.selectAll().then(function(res) {
      self.unassigned = res.data.result;
    });
  }
]);
