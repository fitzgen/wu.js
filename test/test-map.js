const wu = require("../wu");
const assert = require("../assert");
describe("wu.map", () => {
  it("should map the function over the iterable", () => {
    assert.eqArray([1, 4, 9],
                   wu.map(x => x * x, [1, 2, 3]));
  });
});
