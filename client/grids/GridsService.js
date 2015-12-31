angular.module('caac.grids.service', [
  ])
  .factory('GridsService', ['$log', '$http',
    function($log, $http) {
      var logger = $log.getInstance('GridsService');

      var selectForOrganizer = function(organizerId) {
        return $http.get('/api/v1/grids.json?organizer_id='+organizerId);
      };

      var insert = function(organizer_id, name) {
        logger.info( 'attempting to insert a new grid named "' + name
                   + '" for organizer ' + organizer_id
                    );
        return $http.post('/api/v1/grids.json', {name: name, organizer_id: organizer_id});
      };

      var edit = function(grid, newName) {
        logger.info('attempting to rename grid "' + grid.name + '" to "' + newName + '"');
        return $http.put('/api/v1/grids/' + grid.id + '.json', {name: newName});
      };

      var delete_ = function(grid) {
        logger.info('attempting to remove grid "' + grid.name + '"');
        return $http.delete('/api/v1/grids/' + grid.id + '.json');
      };

      return {
        insert: insert,
        edit: edit,
        delete_: delete_,
        selectForOrganizer: selectForOrganizer
      };
    }
  ]);
