"use strict";
describe("wu.concatMap", (function() {
  it("should map the function over the iterable and concatenate results", (function() {
    assert.eqArray([1, 1, 2, 4, 3, 9], wu.concatMap((function(x) {
      return [x, x * x];
    }), [1, 2, 3]));
  }));
}));
