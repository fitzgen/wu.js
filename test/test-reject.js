const wu = require("../wu");
const assert = require("../assert");
describe("wu.reject", () => {
  it("should yield items for which the predicate is false", () => {
    assert.eqArray([1, true, {}],
                   wu.reject(x => typeof x === "string",
                             [1, "a", true, "b", {}, "c"]));
  });
});
