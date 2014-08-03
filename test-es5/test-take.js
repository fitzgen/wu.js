"use strict";
describe("wu.take", (function() {
  it("should yield as many items as requested", (function() {
    assert.eqArray([0, 1, 2, 3, 4], wu.take(5, wu.count()));
  }));
}));
