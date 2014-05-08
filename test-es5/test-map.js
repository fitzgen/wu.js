"use strict";
describe("wu.map", (function() {
  it("should map the function over the iterable", (function() {
    assert.eqArray([1, 4, 9], wu.map([1, 2, 3], (function(x) {
      return x * x;
    })));
  }));
}));
