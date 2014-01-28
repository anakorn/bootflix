'use strict';

angular.module('bf.Directives')

.directive('bfMovieList', ['Cart', function(Cart) {
  return {
    restrict: 'E',
    scope: {
      movies: '='
    },
    link: function(scope) {
      scope.Cart = Cart;
      Cart.add(901);
    },
    templateUrl: 'views/MovieList.html'
  };
}]);