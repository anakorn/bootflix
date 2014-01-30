'use strict';

angular.module('bf.Services')

// Takes params. Trims blank values and returns cleaned params.
.factory('ParamsTrimmer', function() {
  return function(params) {
    var cleanedParams = {};
    angular.forEach(params, function(val, key) {
      if (val !== '') {
        cleanedParams[key] = val;
      }
    });
    return cleanedParams;
  };
})

.service('MovieDB', ['$http', function($http) {
  this.getMovies = function(options, successCb, errorCb) {
    doMovieDbGet('movies', options, successCb, errorCb);
  };

  this.getMoviesById = function(id, successCb, errorCb) {
    doMovieDbGet('movies', {
      'id': id
    }, successCb, errorCb);
  };

  this.getMoviesByGenre = function(genre, successCb, errorCb) {
    doMovieDbGet('movies', {
      'genre': genre
    }, successCb, errorCb);
  };

  this.getMoviesByStar = function(firstName, lastName, successCb, errorCb) {
    doMovieDbGet('movies', {
      'first_name': firstName,
      'last_name': lastName
    }, successCb, errorCb);
  };

  this.getStarsByMovieId = function(movieId, successCb, errorCb) {
    doMovieDbGet('stars', {
      'movie_id': movieId
    }, successCb, errorCb);
  };

  this.getGenresByMovieId = function(movieId, successCb, errorCb) {
    doMovieDbGet('genres', {
      'movie_id': movieId
    }, successCb, errorCb);
  };

  function doMovieDbGet(table, options, successCb, errorCb) {
    $http.get('http://localhost:8080/p2/' + table + '.json', {
      params: options
    })
    .success(successCb)
    .error(errorCb);
  }

}])

.service('Cart', [function() {
  // Make sure to parseInt(id) before using id, because argument may be string ID

  this.add = function(id) {
    id = parseInt(id);
    if (this.contains(id)) {
      console.log('ERROR: Movie ' + id + ' is already in cart!');
      return;
    }
    ids.push(id);
    console.log('SUCCESS: Movie ' + id + ' added to cart.');
  };

  this.remove = function(id) {
    id = parseInt(id);
    ids.splice(ids.indexOf(id), 1);
    console.log('SUCCESS: Movie ' + id + ' removed from cart.');
  };

  this.contains = function(id) {
    id = parseInt(id);
    return ids.indexOf(id) !== -1;
  };

  this.getCount = function() {
    return ids.length;
  };

  this.getIds = function() {
    return ids;
  };

  var ids = [];

}]);