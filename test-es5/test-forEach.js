"use strict";
describe("wu.forEach", (function() {
  it("should iterate over every item", (function() {
    var items = [];
    wu.forEach((function(x) {
      return items.push(x);
    }), [1, 2, 3]);
    assert.eqArray([1, 2, 3], items);
  }));
}));
