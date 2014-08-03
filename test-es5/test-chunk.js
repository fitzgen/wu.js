"use strict";
describe("wu.chunk", (function() {
  it("should chunk items into tuples", (function() {
    assert.eqArray([[1, 2, 3], [4, 5, 6]], wu.chunk(3, [1, 2, 3, 4, 5, 6]));
  }));
}));
