angular.module('caac.dashboard.organizers.map.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.title.service',
  'caac.grids.service',
  'caac.pathways.service',
  'caac.opportunities.service',
  'caac.organizers.service',
  'dndLists'
]).controller('MapController', ['$log', '$scope', 'TitleService', 'GridsService',
    'PathwaysService', 'OpportunitiesService', 'OrganizersService',
  function($log, $scope, TitleService, GridsService, PathwaysService,
      OpportunitiesService, OrganizersService) {
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
      var name = prompt("Okay! Let's edit '" + grid.name + "'. What should its new name be?");
      GridsService.edit(grid, name).then(function(res) {
        grid.name = name;
      });
    };

    self.editPathway = function(pathway) {
      var name = prompt("Okay! Let's edit '" + pathway.name + "'. What should its new name be?");
      PathwaysService.edit(pathway, name).then(function(res) {
        pathway.name = name;
      });
    };


    // Delete
    // ======

    self.deleteGrid = function(grid) {
      if (confirm("Really delete grid '" + grid.name + "'?")) {
        GridsService.delete_(grid).then(function(res) {
          var i = self.grids.indexOf(grid);
          self.grids.splice(i, 1);
          self.selectGrid(self.grids[i-1]);
        });
      }
    };

    self.deletePathway = function(pathway) {
      if (confirm("Really delete pathway '" + pathway.name + "'?")) {
        PathwaysService.delete_(pathway).then(function(res) {
          var i = self.currentGrid.pathways.indexOf(pathway);
          self.currentGrid.pathways.splice(i, 1);
          self.selectPathway(self.currentGrid.pathways[i-1]);
        });
      }
    };


    // Assignment
    // ==========

    self.assignOrReorderNode = function(node) {
        OpportunitiesService.assignOrReorder(node);
    };

    self.unassignNode = function(node) {
        OpportunitiesService.unassign(node);
    };


    // Initialize
    // ==========

    GridsService.selectForOrganizer(organizerId).then(function(res) {
      self.grids = res.data.grids;
      if (self.grids.length) {
          self.selectGrid(self.grids[0]);
      }
    });

    OpportunitiesService.selectForOrganizer(organizerId).then(function(res) {
      self.unassigned = res.data.opportunities;
    });
  }
]);
