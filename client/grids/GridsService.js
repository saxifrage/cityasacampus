angular.module('caac.grids.service', [
  ])
  .factory('GridsService', ['$log', '$http',
    function($log, $http) {
      var logger = $log.getInstance('GridsService');

      var selectAll = function(organizer_id) {
        return $http.get('/api/v1/grids.json?organizer_id='+organizer_id);
      };

      var insert = function(organizer_id, name) {
        logger.info( 'attempting to insert a new grid named "' + name
                   + '" for organizer ' + organizer_id
                    );
        return $http.post('/api/v1/grids.json', {name: name, organizer_id: organizer_id});
      };

      return {
        insert: insert,
        selectAll: selectAll
      };
    }
  ]);
