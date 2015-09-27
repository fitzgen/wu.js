const wu = require("../wu");
const assert = require("../assert");
describe("wu.curryable", () => {
  it("should wait until its given enough arguments", () => {
    var f = wu.curryable((a, b) => a + b);

    var f0 = f()()()()();
    assert.equal(typeof f0, "function");

    var f1 = f(1);
    assert.equal(typeof f1, "function");
    assert.equal(f1(2), 3);
  });

  it("should just call the function when given enough arguments", () => {
    var f = wu.curryable((a, b) => a + b);
    assert.equal(f(1, 2), 3);
  });

  it("should expect the number of arguments we tell it to", () => {
    var f = wu.curryable((...args) => 5, 5);
    assert.equal(typeof f(1, 2, 3, 4), "function");
    assert.equal(f(1, 2, 3, 4, 5), 5);
  });
});
