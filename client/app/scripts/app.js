'use strict';

angular.module('bf.Services', []);

angular.module('bf.Controllers', ['bf.Services']);

angular.module('bf.Directives', ['bf.Services']);

angular.module('bf.App', [
  'ui.bootstrap',
  'ngCookies',
  // 'ngResource',
  'ngSanitize',
  'ngRoute',
  'bf.Controllers',
  // 'bf.Services',
  'bf.Directives'
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
    })
    .when('/stars', {
      templateUrl: 'views/stars.html',
      controller: 'StarsCtrl'
    })
    .when('/stars/:id', {
      templateUrl: 'views/star_detail.html',
      controller: 'StarDetailCtrl'
    })
    .when('/movies', {
      templateUrl: 'views/movies.html',
      controller: 'MoviesCtrl'
    })
    .when('/movies/:id', {
      templateUrl: 'views/movie_detail.html',
      controller: 'MovieDetailCtrl'
    })
    .when('/cart', {
      templateUrl: 'views/cart.html',
      controller: 'CartCtrl'
    })
    .when('/cart/checkout', {
      templateUrl: 'views/checkout.html',
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
