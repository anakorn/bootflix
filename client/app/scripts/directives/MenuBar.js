'use strict';

angular.module('bf.Directives')

.directive('bfMenuBar', function() {
  return {
    restrict: 'E',
    scope: {
      cartCount: '@'
    },
    templateUrl: 'views/MenuBar.html'
  };
});