"use strict";
describe("wu.values", (function() {
  it("should iterate over values", (function() {
    assert.eqSet(new Set([1, 2, 3]), wu.values({
      foo: 1,
      bar: 2,
      baz: 3
    }));
  }));
}));
