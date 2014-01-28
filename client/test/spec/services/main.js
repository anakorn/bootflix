'use strict';

describe('Service: Cart', function () {

  var Cart;

  // Initialize the controller and a mock scope
  beforeEach(function() {

    module('bf.Services');

    inject(function($injector) {
      Cart = $injector.get('Cart');
    });

  });

  it('should accurately count number of items in cart', function() {
    expect(Cart.getCount()).toBe(0);
  });

  it('should be able to add items to cart', function () {
    Cart.add(0);
    Cart.add(1);
    Cart.add(2);
    expect(Cart.getCount()).toBe(3);
  });
});
