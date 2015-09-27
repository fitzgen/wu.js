const wu = require("../wu");
const assert = require("../assert");
describe("wu.has", () => {
  it("should return true if the item is in the iterable", () => {
    assert.ok(wu.has(3, [1,2,3]));
  });

  it("should return false if the item is not in the iterable", () => {
    assert.ok(!wu.has("36 chambers", [1,2,3]));
  });
});
