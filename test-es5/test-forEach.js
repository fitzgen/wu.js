"use strict";
describe("wu.forEach", (function() {
  it("should iterate over every item", (function() {
    var items = [];
    wu.forEach([1, 2, 3], (function(x) {
      return items.push(x);
    }));
    assert.eqArray([1, 2, 3], items);
  }));
}));
