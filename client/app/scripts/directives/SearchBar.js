'use strict';

angular.module('bf.Directives')

.directive('bfSearchBar', ['$location', function($location) {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope) {
      scope.query = $location.search().q || '';
      scope.search = function(query) {
        $location.path('/results').search({q: query});
      };
    },
    templateUrl: 'views/SearchBar.html'
  };
}]);