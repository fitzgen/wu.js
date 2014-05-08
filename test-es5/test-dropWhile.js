"use strict";
describe("wu.dropWhile", (function() {
  it("should drop items while the predicate is true", (function() {
    var count = wu.dropWhile(wu.count(), (function(x) {
      return x < 5;
    }));
    assert.equal(count.next().value, 5);
  }));
}));
