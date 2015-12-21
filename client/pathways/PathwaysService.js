angular.module('caac.pathways.service', [
  ])
  .factory('PathwaysService', ['$log', '$http',
    function($log, $http) {
      var logger = $log.getInstance('PathwaysService');

      var insert = function(grid, name) {
        logger.info( 'attempting to insert a new pathway named "' + name
                   + '" into grid "' + grid.name + '" (' + grid.id + ')'
                    );
        return $http.post('/api/v1/pathways.json', {name: name, grid_id: grid.id});
      };

      var edit = function(pathway, newName) {
        logger.info('attempting to rename pathway "' + pathway.name + '" to "' + newName + '"');
        return $http.put('/api/v1/pathways/' + pathway.id + '.json', {name: newName});
      };

      var delete_ = function(pathway) {
        logger.info('attempting to remove pathway "' + pathway.name + '"');
        return $http.delete('/api/v1/pathways/' + pathway.id + '.json');
      };

      return {
        insert: insert,
        delete_: delete_,
        edit: edit
      };
    }
  ]);
