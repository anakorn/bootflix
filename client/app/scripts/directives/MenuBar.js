'use strict';

angular.module('bf.Directives')

.directive('bfMenuBar', ['$modal', 'Cart', function($modal, Cart) {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope) {

      scope.cartCount = function() {
        return Cart.getTotalCount();
      };
      scope.openGenres = function() {
        $modal.open({
          templateUrl: 'views/templates/GenresModal.html',
          controller: ['$scope', 'MovieDB', function($scope, MovieDB) {
            MovieDB.getGenres({}, function(response) {
              $scope.genres = response.results;
            });
          }]
        });
      };
      scope.openTitles = function() {
        $modal.open({
          templateUrl: 'views/templates/TitlesModal.html'
        });
      };

    },
    templateUrl: 'views/templates/MenuBar.html'
  };
}]);