'use strict';

angular.module('bf.Directives')

.directive('bfCartableButton', ['Cart', function(Cart) {
  return {
    restrict: 'E',
    scope: {
      id: '@movieId'
    },
    link: function(scope) {
      scope.Cart = Cart;
      scope.$watch('Cart.ids[id]', function(newVal) {
        if (newVal === 0) {
          delete Cart.ids[scope.id];
        }
      });
      // if (typeof(Cart.ids[scope.id]) === 'undefined') {
      //   Cart.ids[scope.id] = 0;
      // }
      // scope.numInCart = Cart.getCopyCount(scope.id);

      // scope.$watch('numInCart', function(newVal, oldVal) {
      //   var diff = newVal - oldVal;
      //   console.log(diff);
      //   Cart.updateItem(scope.id, diff);
      // });
    },
    template: '<input style="min-width:50px" class="form-control input-sm" type="number" min="0" max="99" placeholder="0" ng-model="Cart.ids[id]">'
    // template: '<button class="btn btn-xs btn-success" ng-show="!isInCart()" ng-click="add()"><span class="glyphicon glyphicon-plus" title="Add to cart"></span></button>' +
    //   '<button class="btn btn-xs btn-danger" ng-show="isInCart()" ng-click="remove()"><span class="glyphicon glyphicon-minus" title="Remove from cart"></span></button>'
  };
}]);