angular.module('caac.shared.copyright.directive', [

]).directive('copyright', [function() {
  return {
    restrict: 'E',
    templateUrl: 'shared/copyright/CopyrightView.html',
    link: function(scope, elem) {
      var self = scope;

      self.year = new Date().getFullYear();
    }
  };
}]);