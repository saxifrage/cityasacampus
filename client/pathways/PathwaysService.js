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

      return {
        insert: insert
      };
    }
  ]);
