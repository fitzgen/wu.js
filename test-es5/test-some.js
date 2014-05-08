"use strict";
describe("wu.some", (function() {
  it("should return true if any item matches the predicate", (function() {
    assert.ok(wu.some([1, 2, 3], (function(x) {
      return x % 2 === 0;
    })));
  }));
  it("should return false if no items match the predicate", (function() {
    assert.ok(!wu.some([1, 2, 3], (function(x) {
      return x % 5 === 0;
    })));
  }));
}));
