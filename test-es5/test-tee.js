"use strict";
describe("wu.tee", (function() {
  it("should clone iterables", (function() {
    var factorials = wu.reductions(wu.count(1), (function(a, b) {
      return a * b;
    }));
    var $__0 = $traceurRuntime.assertObject(wu.tee(factorials)),
        i1 = $__0[0],
        i2 = $__0[1];
    assert.equal(i1.next().value, 1);
    assert.equal(i1.next().value, 2);
    assert.equal(i1.next().value, 6);
    assert.equal(i1.next().value, 24);
    assert.equal(i2.next().value, 1);
    assert.equal(i2.next().value, 2);
    assert.equal(i2.next().value, 6);
    assert.equal(i2.next().value, 24);
  }));
}));
