const wu = require("../wu");
const assert = require("../assert");
describe("wu.filter", () => {
  it("should filter based on the predicate", () => {
    assert.eqArray(["a", "b", "c"],
                   wu.filter(x => typeof x === "string",
                            [1, "a", true, "b", {}, "c"]));
  });
});
