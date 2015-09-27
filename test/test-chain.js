const wu = require("../wu");
const assert = require("../assert");
describe("wu.chain", () => {
  it("should concatenate iterables", () => {
    assert.eqArray([1, 2, 3, 4, 5, 6],
                   wu.chain([1, 2], [3, 4], [5, 6]));
  });
});
