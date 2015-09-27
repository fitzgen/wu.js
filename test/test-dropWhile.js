const wu = require("../wu");
const assert = require("../assert");
describe("wu.dropWhile", () => {
  it("should drop items while the predicate is true", () => {
    const count = wu.dropWhile(x => x < 5, wu.count());
    assert.equal(count.next().value, 5);
  });
});
