"use strict";
describe("wu.zip", (function() {
  it("should zip two iterables together", (function() {
    assert.eqArray([["a", 1], ["b", 2], ["c", 3]], wu.zip("abc", [1, 2, 3]));
  }));
  it("should stop with the shorter iterable", (function() {
    assert.eqArray([["a", 1], ["b", 2], ["c", 3]], wu.zip("abc", wu.count(1)));
  }));
}));
