angular.module('caac.shared.title.service', [
    'caac.shared.conf.service'
  ])
  .factory('TitleService', ['$window', 'ConfService', function($window,
    ConfService) {
    var set = function(title) {
      var base = ConfService.get('ENV') + ConfService.get('CITY') + ' ' +
        ConfService.get('APP');

      $window.document.title = base + ' - ' + title;
    };

    return {
      set: set
    };
  }]);