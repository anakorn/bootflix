'use strict';

angular.module('bf.Controllers')

.controller('SearchResultsCtrl', ['$scope', 'MovieDB','$location', function($scope, MovieDB, $location) {
  MovieDB.getMovies($location.search(), function(response) {
    $scope.movies = response.results || {};
  }, function() {
    $scope.movies = {};
  });
}])

.controller('MovieCtrl', ['$scope', '$location', 'MovieDB', function($scope, $location, MovieDB) {
  var id = $location.path('id');
  MovieDB.getMoviesById(id, function(response) {
    $scope.movie = response.results[0];
  });
}]);