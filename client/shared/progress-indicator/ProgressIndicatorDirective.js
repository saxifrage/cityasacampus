angular.module('caac.shared.progress-indicator.directive', [])
  .controller('ProgressIndicatorController', function($scope) {
      var self = $scope;
      self.steps = [];

      for (var i = 1; i <= self.numberOfSteps; i++) {
        self.steps.push({ text: i, complete: i <= self.currentStep });
        self.steps.push('');
      }
    }
  )
  .directive('progressIndicator', function() {
    return {
      restrict: 'E',
      scope: {
        currentStep: '=',
        numberOfSteps: '='
      },
      templateUrl: 'shared/progress-indicator/ProgressIndicatorView.html',
      controller: 'ProgressIndicatorController'
    };
  });
