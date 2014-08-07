"use strict";
describe("wu.dropWhile", (function() {
  it("should drop items while the predicate is true", (function() {
    var count = wu.dropWhile((function(x) {
      return x < 5;
    }), wu.count());
    assert.equal(count.next().value, 5);
  }));
}));
