'use strict';

angular.module('bf.Directives')

.directive('bfMoviesListing', ['Cart', function(Cart) {
  return {
    restrict: 'E',
    scope: {
      movies: '='
    },
    link: function(scope) {
      scope.Cart = Cart;
    },
    templateUrl: 'views/templates/MoviesListing.html'
  };
}]);