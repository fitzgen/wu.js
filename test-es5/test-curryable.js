"use strict";
describe("wu.curryable", (function() {
  it("should wait until its given enough arguments", (function() {
    var f = wu.curryable((function(a, b) {
      return a + b;
    }));
    var f0 = f()()()()();
    assert.equal((typeof f0 === 'undefined' ? 'undefined' : $traceurRuntime.typeof(f0)), "function");
    var f1 = f(1);
    assert.equal((typeof f1 === 'undefined' ? 'undefined' : $traceurRuntime.typeof(f1)), "function");
    assert.equal(f1(2), 3);
  }));
  it("should just call the function when given enough arguments", (function() {
    var f = wu.curryable((function(a, b) {
      return a + b;
    }));
    assert.equal(f(1, 2), 3);
  }));
  it("should expect the number of arguments we tell it to", (function() {
    var f = wu.curryable((function() {
      for (var args = [],
          $__0 = 0; $__0 < arguments.length; $__0++)
        $traceurRuntime.setProperty(args, $__0, arguments[$traceurRuntime.toProperty($__0)]);
      return 5;
    }), 5);
    assert.equal($traceurRuntime.typeof(f(1, 2, 3, 4)), "function");
    assert.equal(f(1, 2, 3, 4, 5), 5);
  }));
}));
