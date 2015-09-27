const wu = require("../wu");
const assert = require("../assert");
describe("wu.every", () => {
  it("should return true when the predicate succeeds for all items", () => {
    assert.equal(true, wu.every(x => typeof x === "number", [1, 2, 3]));
  });

  it("should return false when the predicate fails for any item", () => {
    assert.equal(false, wu.every(x => typeof x === "number", [1, 2, "3"]));
  });
});
