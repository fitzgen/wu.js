const wu = require("../wu");
const assert = require("../assert");
describe("wu.some", () => {
  it("should return true if any item matches the predicate", () => {
    assert.ok(wu.some(x => x % 2 === 0, [1,2,3]));
  });

  it("should return false if no items match the predicate", () => {
    assert.ok(!wu.some(x => x % 5 === 0, [1,2,3]));
  });
});
