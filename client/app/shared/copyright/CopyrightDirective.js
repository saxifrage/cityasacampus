angular.module('caac.shared.copyright.directive', [

  ])
  .controller('CopyrightController', ['$scope',
    function($scope) {
      var self = $scope;

      self.year = new Date().getFullYear();
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