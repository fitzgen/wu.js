"use strict";
describe("wu.pluck", (function() {
  it("should access the named property of each item in the iterable", (function() {
    assert.eqArray([1, 2, 3], wu.pluck("i", [{i: 1}, {i: 2}, {i: 3}]));
  }));
}));
