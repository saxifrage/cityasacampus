angular.module('caac.shared.loader.directive', [

]).directive('loadingIndicator',
  function() {
    return {
      restrict: 'E',
      templateUrl: 'shared/loader/LoadingIndicatorView.html'
    };
  });