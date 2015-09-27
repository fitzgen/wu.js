const wu = require("../wu");
const assert = require("../assert");
describe("wu.takeWhile", () => {
  it("should keep yielding items from the iterable until the predicate is false", () => {
    assert.eqArray([0, 1, 2, 3, 4],
                   wu.takeWhile(x => x < 5, wu.count()));
  });
});
