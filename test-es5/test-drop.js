"use strict";
describe("wu.drop", (function() {
  it("should drop the number of items specified", (function() {
    var count = wu.count().drop(5);
    assert.equal(count.next().value, 5);
  }));
}));
