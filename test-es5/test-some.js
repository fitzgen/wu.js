"use strict";
describe("wu.some", (function() {
  it("should return true if any item matches the predicate", (function() {
    assert.ok(wu.some((function(x) {
      return x % 2 === 0;
    }), [1, 2, 3]));
  }));
  it("should return false if no items match the predicate", (function() {
    assert.ok(!wu.some((function(x) {
      return x % 5 === 0;
    }), [1, 2, 3]));
  }));
}));
