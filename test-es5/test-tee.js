"use strict";
describe("wu.tee", (function() {
  it("should clone iterables", (function() {
    var factorials = wu.reductions((function(a, b) {
      return a * b;
    }), wu.count(1));
    var $__0 = $traceurRuntime.assertObject(wu.tee(factorials)),
        copy1 = $__0[0],
        copy2 = $__0[1];
    var i1 = iter(copy1);
    var i2 = iter(copy2);
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
