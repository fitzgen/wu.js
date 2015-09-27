const wu = require("../wu");
const assert = require("../assert");
describe("wu.pluck", () => {
  it("should access the named property of each item in the iterable", () => {
    assert.eqArray([1, 2, 3],
                   wu.pluck("i", [{ i: 1 }, { i: 2 }, { i: 3 }]));
  });
});
