"use strict";
describe("wu.entries", (function() {
  it("should iterate over entries", (function() {
    var expected = new Map([["foo", 1], ["bar", 2], ["baz", 3]]);
    for (var $__0 = wu.entries({
      foo: 1,
      bar: 2,
      baz: 3
    })[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__1; !($__1 = $__0.next()).done; ) {
      try {
        throw undefined;
      } catch (v) {
        try {
          throw undefined;
        } catch (k) {
          try {
            throw undefined;
          } catch ($__2) {
            {
              {
                $__2 = $traceurRuntime.assertObject($__1.value);
                k = $__2[0];
                v = $__2[1];
              }
              {
                assert.equal(expected.get(k), v);
              }
            }
          }
        }
      }
    }
  }));
}));
