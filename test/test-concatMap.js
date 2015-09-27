const wu = require("../wu");
const assert = require("../assert");
describe("wu.concatMap", () => {
  it("should map the function over the iterable and concatenate results", () => {
    assert.eqArray([1, 1, 2, 4, 3, 9],
                   wu.concatMap(x => [x, x * x], [1, 2, 3]));
  });
});
