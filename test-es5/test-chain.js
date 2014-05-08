"use strict";
describe("wu.chain", (function() {
  it("should concatenate iterables", (function() {
    assert.eqArray([1, 2, 3, 4, 5, 6], wu.chain([1, 2], [3, 4], [5, 6]));
  }));
}));
