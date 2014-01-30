'use strict';

angular.module('bf.Directives')

.directive('bfSearchBar', ['$location', 'ParamsTrimmer', function($location, ParamsTrimmer) {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope) {
      scope.params = $location.search();
      scope.search = function() {
        var params = ParamsTrimmer(scope.params);
        $location.path('/results').search(params);
      };
    },
    templateUrl: 'views/templates/SearchBar.html'
  };
}]);