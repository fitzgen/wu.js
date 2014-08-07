"use strict";
describe("wu.keys", (function() {
  it("should iterate over keys", (function() {
    assert.eqSet(new Set(["foo", "bar", "baz"]), wu.keys({
      foo: 1,
      bar: 2,
      baz: 3
    }));
  }));
}));
