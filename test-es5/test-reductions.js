"use strict";
describe("wu.reductions", (function() {
  it("should yield the intermediate reductions of the iterable", (function() {
    assert.eqArray([1, 3, 6], wu.reductions((function(x, y) {
      return x + y;
    }), undefined, [1, 2, 3]));
  }));
}));
