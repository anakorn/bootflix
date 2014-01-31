'use strict';

angular.module('bf.Directives')

.directive('bfSearchBar', ['$location', 'ParamsTrimmer', function($location, ParamsTrimmer) {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope) {
      scope.params = $location.search();
      scope.search = function() {
        scope.params.offset = '';
        var params = ParamsTrimmer(scope.params);
        $location.path('/movies').search(params);
      };
      scope.clearFields = function() {
        scope.params = {};
      };
    },
    templateUrl: 'views/templates/SearchBar.html'
  };
}]);