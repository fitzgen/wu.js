"use strict";
describe("wu.filter", (function() {
  it("should filter based on the predicate", (function() {
    assert.eqArray(["a", "b", "c"], wu.filter((function(x) {
      return typeof x === "string";
    }), [1, "a", true, "b", {}, "c"]));
  }));
}));
