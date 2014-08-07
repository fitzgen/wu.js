"use strict";
describe("wu.cycle", (function() {
  it("should keep yielding items from the original iterable", (function() {
    var i = 0;
    var arr = [1, 2, 3];
    for (var $__0 = wu.cycle(arr)[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__1; !($__1 = $__0.next()).done; ) {
      try {
        throw undefined;
      } catch (x) {
        {
          x = $__1.value;
          {
            assert.equal(x, arr[$traceurRuntime.toProperty(i % 3)]);
            if (i++ > 9) {
              break;
            }
          }
        }
      }
    }
  }));
}));
