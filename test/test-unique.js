const wu = require("../wu");
const assert = require("../assert");
describe("wu.unique", () => {
  it("should yield only the unique items from the iterable", () => {
    assert.eqArray([1, 2, 3],
                   wu.unique([1,1,2,2,1,1,3,3]));
  });
});
