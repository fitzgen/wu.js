"use strict";
describe("wu.zipWith", (function() {
  it("should spread map over the zipped iterables", (function() {
    var add3 = (function(a, b, c) {
      return a + b + c;
    });
    assert.eqArray([12, 15, 18], wu.zipWith(add3, [1, 2, 3], [4, 5, 6], [7, 8, 9]));
  }));
}));
