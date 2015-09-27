const wu = require("../wu");
const assert = require("../assert");
describe("wu.drop", () => {
  it("should drop the number of items specified", () => {
    const count = wu.count().drop(5);
    assert.equal(count.next().value, 5);
  });
});
