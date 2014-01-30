'use strict';

angular.module('bf.Directives')

.directive('bfCartableButton', ['Cart', function(Cart) {
  return {
    restrict: 'E',
    scope: {
      id: '@movieId'
    },
    link: function(scope) {
      scope.add = function() {
        Cart.add(scope.id);
      };
      scope.remove = function() {
        Cart.remove(scope.id);
      };
      scope.isInCart = function() {
        return Cart.contains(scope.id);
      };
    },
    template: '<button class="btn btn-success" ng-show="!isInCart()" ng-click="add()"><span class="glyphicon glyphicon-plus" title="Add to cart"></span></button>' +
      '<button class="btn btn-danger" ng-show="isInCart()" ng-click="remove()"><span class="glyphicon glyphicon-minus" title="Remove from cart"></span></button>'
  };
}]);