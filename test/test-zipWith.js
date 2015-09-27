const wu = require("../wu");
const assert = require("../assert");
describe("wu.zipWith", () => {
  it("should spread map over the zipped iterables", () => {
    const add3 = (a, b, c) => a + b + c;
    assert.eqArray([12, 15, 18],
                   wu.zipWith(add3,
                              [1, 2, 3],
                              [4, 5, 6],
                              [7, 8, 9]));
  });
});
