"use strict";
describe("wu.every", (function() {
  it("should return true when the predicate succeeds for all items", (function() {
    assert.equal(true, wu.every((function(x) {
      return typeof x === "number";
    }), [1, 2, 3]));
  }));
  it("should return false when the predicate fails for any item", (function() {
    assert.equal(false, wu.every((function(x) {
      return typeof x === "number";
    }), [1, 2, "3"]));
  }));
}));
