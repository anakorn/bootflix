'use strict';

angular.module('bf.Controllers')

.controller('MoviesCtrl', ['$scope', 'MovieDB','$location', function($scope, MovieDB, $location) {
  var params = $location.search();
  $scope.limit = parseInt(typeof(params.limit) === 'undefined' ? 10 : params.limit);
  $scope.offset = parseInt(typeof(params.offset) === 'undefined' ? 0 : params.offset);

  $scope.prevPage = function() {
    if ($scope.offset !== 0) {
      $location.search('offset', $scope.offset - $scope.limit);
    }
  };
  $scope.nextPage = function() {
    if ($scope.movies.length === $scope.limit) {
      $location.search('offset', $scope.offset + $scope.limit);
    }
  };

  // Populate page
  MovieDB.getMovies(params, function(response) {
    $scope.movies = response.results || {};
    angular.forEach($scope.movies, function(movie) {

      MovieDB.getStarsByMovieId(movie.id, function(resp) {
        movie.stars = resp.results;
      });
      // MovieDB.getGenresByMovieId(movie.id, function(resp) {
      //   movie.genres = resp.results;
      // });

    });
  });
}])

.controller('StarsCtrl', ['$scope', 'MovieDB', function($scope, MovieDB) {
  // Populate page
  MovieDB.getStars({}, function(response) {
    $scope.stars = response.results;
  });
}])

.controller('StarDetailCtrl', ['$scope', '$routeParams', 'MovieDB', function($scope, $routeParams, MovieDB) {
  var id = $routeParams.id;
  MovieDB.getStarById(id, function(response) {
    $scope.star = response.results[0];
  });
  MovieDB.getMoviesByStarId(id, function(response) {
    $scope.movies = response.results;
  });
}])

.controller('MovieDetailCtrl', ['$scope', '$routeParams', 'MovieDB', function($scope, $routeParams, MovieDB) {
  var id = $routeParams.id;
  MovieDB.getMovieById(id, function(response) {
    $scope.movie = response.results[0];
  });
  MovieDB.getStarsByMovieId(id, function(response) {
    $scope.stars = response.results;
  });
  MovieDB.getGenresByMovieId(id, function(response) {
    $scope.genres = response.results;
  });
}])

.controller('CartCtrl', ['$scope', 'Cart', 'MovieDB', function($scope, Cart, MovieDB) {
  $scope.movies = [];
  $scope.remove = function(movieId) {
    Cart.ids[movieId] = 0;
    $scope.movies = $scope.movies.filter(function(movie) {
      return movie.id !== movieId;
    });
  };

  angular.forEach(Cart.ids, function(qty, id) {
    MovieDB.getMovieById(id, function(response) {
      var movie = response.results[0];
      $scope.movies.push(movie);
    });
  });
}]);