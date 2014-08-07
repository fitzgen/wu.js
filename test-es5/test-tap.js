"use strict";
describe("wu.tap", (function() {
  it("should perform side effects and yield the original item", (function() {
    var i = 0;
    assert.eqArray([1, 2, 3], wu.tap((function(x) {
      return i++;
    }), [1, 2, 3]));
    assert.equal(i, 3);
  }));
}));
