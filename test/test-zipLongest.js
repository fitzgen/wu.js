const wu = require("../wu");
const assert = require("../assert");
describe("wu.zipLongest", () => {
  it("should stop with the longer iterable", () => {
    const arr1 = [];
    arr1[1] = 2;
    const arr2 = [];
    arr2[1] = 3;
    assert.eqArray([["a", 1], arr1, arr2],
                   wu.zipLongest("a", [1, 2, 3]));
  });
});
