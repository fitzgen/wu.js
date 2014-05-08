"use strict";
describe("wu.reduce", (function() {
  it("should reduce the iterable with the function", (function() {
    assert.equal(6, wu.reduce([1, 2, 3], (function(x, y) {
      return x + y;
    })));
  }));
  it("should accept an initial state for the reducer function", (function() {
    assert.equal(16, wu.reduce([1, 2, 3], (function(x, y) {
      return x + y;
    }), 10));
  }));
}));
