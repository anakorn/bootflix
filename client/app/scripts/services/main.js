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

  this.getMovieById = function(id, successCb, errorCb) {
    doMovieDbGet('movies', {
      'id': id,
      'limit': 1
    }, successCb, errorCb);
  };

  this.getMoviesByGenre = function(genre, successCb, errorCb) {
    doMovieDbGet('movies', {
      'genre': genre
    }, successCb, errorCb);
  };

  this.getMoviesByStarId = function(starId, successCb, errorCb) {
    doMovieDbGet('movies', {
      'star_id': starId
    }, successCb, errorCb);
  };

  this.getStars = function(options, successCb, errorCb) {
    doMovieDbGet('stars', options, successCb, errorCb);
  };

  this.getStarById = function(id, successCb, errorCb) {
    doMovieDbGet('stars', {
      'id': id
    }, successCb, errorCb);
  };

  this.getStarsByMovieId = function(id, successCb, errorCb) {
    doMovieDbGet('stars', {
      'movie_id': id
    }, successCb, errorCb);
  };

  this.getGenres = function(options, successCb, errorCb) {
    doMovieDbGet('genres', options, successCb, errorCb);
  };
  
  this.getGenresByMovieId = function(id, successCb, errorCb) {
    doMovieDbGet('genres', {
      'movie_id': id
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
  this.ids = {};

  this.getTotalCount = function() {
    var count = 0;
    angular.forEach(this.ids, function(val) {
      count += val;
    });
    return count;
  };
  // this.updateItem = function(id, diff) {
  //   if (diff > 0) {
  //     add(id, diff);
  //   } else if (diff < 0) {
  //     remove(id, -diff);
  //   }
  // };

  // this.getCopyCount = function(id) {
  //   return typeof(ids[id]) === 'undefined' ? 0 : ids[id];
  // };

  // this.getTotalCount = function() {
  //   return count;
  // };

  // this.getIds = function() {
  //   return ids;
  // };

  // function add(id, num) {
  //   if (typeof(ids[id]) === 'undefined') {
  //     ids[id] = num;
  //   } else {
  //     ids[id] += num;
  //   }
  //   count += num;
  //   console.log('SUCCESS: Added movie ' + id + '. ' + num + ' =' + ids[id]);
  // };

  // function remove(id, num) {
  //   if (ids[id] - num > 0) {
  //     ids[id] -= num;
  //     count -= num;
  //     console.log('SUCCESS: Removed movie ' + id + '. ' + num + ' =' + ids[id]);
  //   } else if (ids[id] - num === 0) {
  //     delete ids[id];
  //     count -= num;
  //     console.log('SUCCESS: Removed movie ' + id + '. ' + num + ' =' + ids[id]);
  //   }
  // };

}]);