angular.module('caac.shared.copyright.directive', [
    'caac.shared.dates.moment.instance',
  ])
  .controller('CopyrightController', ['$scope', 'MomentInstance',
    function($scope, MomentInstance) {
      var self = $scope;

      self.year = MomentInstance().format('YYYY');
    }
  ])
  .directive('copyright', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'shared/copyright/CopyrightView.html',
        controller: 'CopyrightController'
      };
    }
  ]);