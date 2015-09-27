const wu = require("../wu");
const assert = require("../assert");
describe("wu.enumerate", () => {
  it("should yield items with their index", () => {
    assert.eqArray([["a", 0], ["b", 1], ["c", 2]],
                   wu.enumerate("abc"));
  });
});
