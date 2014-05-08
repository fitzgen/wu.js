"use strict";
describe("wu.enumerate", (function() {
  it("should yield items with their index", (function() {
    assert.eqArray([["a", 0], ["b", 1], ["c", 2]], wu.enumerate("abc"));
  }));
}));
