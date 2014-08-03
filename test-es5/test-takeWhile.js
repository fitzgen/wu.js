"use strict";
describe("wu.takeWhile", (function() {
  it("should keep yielding items from the iterable until the predicate is false", (function() {
    assert.eqArray([0, 1, 2, 3, 4], wu.takeWhile((function(x) {
      return x < 5;
    }), wu.count()));
  }));
}));
