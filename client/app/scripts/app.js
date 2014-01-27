'use strict';

angular.module('bf.Services', []);

angular.module('bf.Controllers', ['bf.Services']);

angular.module('bf.Directives', []);

angular.module('bf.App', [
  'ngCookies',
  // 'ngResource',
  'ngSanitize',
  'ngRoute',
  'bf.Controllers',
  // 'bf.Services',
  // 'bf.Directives'
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/search', {
      templateUrl: 'views/search_adv.html',
    })
    .when('/search/:searchTerms*', {
      templateUrl: 'views/search_results.html',
    })
    .when('/stars', {
      templateUrl: 'views/stars.html',
    })
    .when('/stars/:star', {
      templateUrl: 'views/star_detail.html',
    })
    .when('/movies', {
      templateUrl: 'views/movies.html',
    })
    .when('/movies/:movie', {
      templateUrl: 'views/movie_detail.html',
    })
    .when('/cart', {
      templateUrl: 'views/cart.html',
    })
    .when('/cart/checkout', {
      templateUrl: 'views/checkout.html',
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
