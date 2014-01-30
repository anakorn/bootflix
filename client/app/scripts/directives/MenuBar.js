'use strict';

angular.module('bf.Directives')

.directive('bfMenuBar', ['$location', 'Cart', function($location, Cart) {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope) {
      scope.path = $location.path();
      scope.cartCount = function() {
        return Cart.getCount();
      };
    },
    templateUrl: 'views/templates/MenuBar.html'
  };
}]);