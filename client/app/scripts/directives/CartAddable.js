'use strict';

angular.module('bf.Directives')

.directive('bfCartAddable', ['Cart', function(Cart) {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      movieId: '='
    },
    link: function(scope, element) {
      scope.add = function() {
        Cart.add(scope.movieId);
        element.attr('bf-cart-removable');
        element.removeAttr('bf-cart-addable');
      };
    },
    template: '<span ng-transclude></span><span class="glyphicon glyphicon-plus" style="float:right;cursor:pointer" ng-click="add()"></span>'
  };
}]);