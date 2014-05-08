"use strict";
describe("wu.zipLongest", (function() {
  it("should stop with the longer iterable", (function() {
    var arr1 = [];
    $traceurRuntime.setProperty(arr1, 1, 2);
    var arr2 = [];
    $traceurRuntime.setProperty(arr2, 1, 3);
    assert.eqArray([["a", 1], arr1, arr2], wu.zipLongest("a", [1, 2, 3]));
  }));
}));
