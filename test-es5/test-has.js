"use strict";
describe("wu.has", (function() {
  it("should return true if the item is in the iterable", (function() {
    assert.ok(wu.has([1, 2, 3], 3));
  }));
  it("should return false if the item is not in the iterable", (function() {
    assert.ok(!wu.has([1, 2, 3], "36 chambers"));
  }));
}));
