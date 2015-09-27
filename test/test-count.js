const wu = require("../wu");
const assert = require("../assert");
describe("wu.count", () => {
  it("should keep incrementing", () => {
    const count = wu.count();
    assert.equal(count.next().value, 0);
    assert.equal(count.next().value, 1);
    assert.equal(count.next().value, 2);
    assert.equal(count.next().value, 3);
    assert.equal(count.next().value, 4);
    assert.equal(count.next().value, 5);
  });

  it("should start at the provided number", () => {
    const count = wu.count(5);
    assert.equal(count.next().value, 5);
    assert.equal(count.next().value, 6);
    assert.equal(count.next().value, 7);
  });

  it("should increment by the provided step", () => {
    const count = wu.count(0, 2);
    assert.equal(count.next().value, 0);
    assert.equal(count.next().value, 2);
    assert.equal(count.next().value, 4);
  });
});
