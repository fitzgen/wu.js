"use strict";
describe("wu.asyncEach", (function() {
  it("should iterate over each item", (function() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var n = 0;
    return wu(arr).asyncEach((function(x) {
      n++;
      var start = Date.now();
      while (Date.now() - start <= 3) {}
    }), 3).then((function() {
      assert.equal(n, arr.length);
    }));
  }));
}));
