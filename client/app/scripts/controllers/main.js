'use strict';

angular.module('bf.Controllers')

.controller('MainCtrl', ['$scope', function ($scope) {
  $scope;
  // $scope.doSearch = function() {
  //   MovieDB.getMovies({
  //     limit: $scope.searchLimit,
  //     title: $scope.searchTitle
  //   }, function(response) {
  //     $scope.movies = response.results;
  //   }, function(error) {
  //     console.log('ERROR: ' + error);
  //   });
  // };
}])

.controller('SearchResultsCtrl', ['$scope', '$location', 'MovieDB', function($scope, $location, MovieDB) {
  var query = $location.search().q;
  MovieDB.getMovies({
    title: query
  }, function(response) {
    $scope.movies = response.results;
  });
  // MovieDB.getMovies()
}])

.controller('MenuBarCtrl', ['$scope', 'Cart', function($scope, Cart) {
  $scope.getCartCount = Cart.getCount;
}]);