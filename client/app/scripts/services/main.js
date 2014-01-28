'use strict';

angular.module('bf.Services')

.service('MovieDB', ['$http', function($http) {
  this.getMovies = function(options, successCb, errorCb) {
    $http.get(formatUrl('movies', options))
      .success(successCb)
      .error(errorCb);
  };

  this.getMovieById = function(id, successCb, errorCb) {
    this.getMovies({
      id: id
    }, successCb, errorCb);
  };

  function formatUrl(table, options) {
    var url = 'http://localhost:8080/p2/' + table + '.json';

    if (options) {
      url += '?';
      angular.forEach(options, function(value, key) {
        url += encodeURI(key) + '=' + encodeURI(value) + '&';
      });

      // Removes the extra & sign
      url = url.slice(0, -1);
    }

    console.log('JSON query: ' + url);
    return url;
  }

}])

.service('Cart', [function() {
  this.add = function(id) {
    ids.push(id);
  };

  this.remove = function(id) {
    ids.splice(ids.indexOf(id), 1);
  };

  this.contains = function(id) {
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