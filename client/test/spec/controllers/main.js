'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bf.App'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should not crash when xhr\'ing', function () {
    scope.doSearch({
      limit: 1
    }, function(response) {
      console.log(response.results);
      // expect(response.results.length).toBe(1);
    });
  });
});
