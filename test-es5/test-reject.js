"use strict";
describe("wu.reject", (function() {
  it("should yield items for which the predicate is false", (function() {
    assert.eqArray([1, true, {}], wu.reject((function(x) {
      return typeof x === "string";
    }), [1, "a", true, "b", {}, "c"]));
  }));
}));
