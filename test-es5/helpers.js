"use strict";
window.assert = chai.assert;
assert.iterable = (function(thing) {
  assert.ok(wu(thing));
});
assert.eqSet = (function(expected, actual) {
  assert.iterable(actual);
  for (var $__0 = actual[$traceurRuntime.toProperty(Symbol.iterator)](),
      $__1; !($__1 = $__0.next()).done; ) {
    var x = $__1.value;
    {
      assert.ok(expected.has(x));
      expected.delete(x);
    }
  }
});
assert.eqArray = (function(expected, actual) {
  assert.iterable(actual);
  assert.deepEqual(expected, $traceurRuntime.spread(actual));
});
mocha.setup('bdd');
