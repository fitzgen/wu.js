"use strict";
describe("wu.unzip", (function() {
  it("should create iterables from zipped items", (function() {
    var pairs = [["one", 1], ["two", 2], ["three", 3]];
    var $__0 = $traceurRuntime.assertObject(wu(pairs).unzip()),
        i1 = $__0[0],
        i2 = $__0[1];
    assert.eqArray(["one", "two", "three"], $traceurRuntime.spread(i1));
    assert.eqArray([1, 2, 3], $traceurRuntime.spread(i2));
  }));
}));
