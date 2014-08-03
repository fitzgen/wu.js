"use strict";
window.assert = chai.assert;
assert.eqSet = (function(expected, actual) {
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
  var i = 0;
  for (var $__0 = actual[$traceurRuntime.toProperty(Symbol.iterator)](),
      $__1; !($__1 = $__0.next()).done; ) {
    var x = $__1.value;
    {
      assert.deepEqual(expected[$traceurRuntime.toProperty(i++)], x);
    }
  }
});
window.iter = (function(thing) {
  if (!thing[$traceurRuntime.toProperty(wu.iteratorSymbol)] || typeof thing[$traceurRuntime.toProperty(wu.iteratorSymbol)] !== "function") {
    throw new Error("`" + thing + "` is not iterable!");
  }
  return thing[$traceurRuntime.toProperty(wu.iteratorSymbol)]();
});
mocha.setup('bdd');
