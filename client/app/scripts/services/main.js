'use strict';

angular.module('bf.Services')

.service('MovieDB', ['$http', function($http) {
  this.getMovies = function(options, successCb, errorCb) {
    $http.get(formatUrl('movies', options))
      .success(successCb)
      .error(errorCb);
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
}]);