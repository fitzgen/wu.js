"use strict";
describe("wu.flatten", (function() {
  it("should flatten iterables", (function() {
    assert.eqArray(["I", "like", "LISP"], wu.flatten(["I", ["like", ["LISP"]]]));
  }));
  it("should shallowly flatten iterables", (function() {
    assert.eqArray([1, 2, 3, [[4]]], wu.flatten([1, [2], [3, [[4]]]], true));
  }));
}));
