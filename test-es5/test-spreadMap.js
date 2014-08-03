"use strict";
describe("wu.spreadMap", (function() {
  it("should map the function over the iterable with spread arguments", (function() {
    assert.eqArray([32, 9, 1000], wu.spreadMap(Math.pow, [[2, 5], [3, 2], [10, 3]]));
  }));
}));
