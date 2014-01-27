'use strict';

angular.module('bf.Controllers')

.controller('MainCtrl', ['$scope', 'MovieDB', function ($scope, MovieDB) {
  $scope.searchLimit = 5;
  $scope.searchTitle = '';

  $scope.doSearch = function() {
    MovieDB.getMovies({
      limit: $scope.searchLimit,
      title: $scope.searchTitle
    }, function(response) {
      $scope.movies = response.results;
    }, function(error) {
      console.log(error);
    });
  };
}]);
