"use strict";
describe("wu.reductions", (function() {
  it("should yield the intermediate reductions of the iterable", (function() {
    assert.eqArray([1, 3, 6], wu.reductions([1, 2, 3], (function(x, y) {
      return x + y;
    })));
  }));
}));
