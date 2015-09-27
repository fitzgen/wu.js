const wu = require("../wu");
const assert = require("../assert");
describe("wu.zip", () => {
  it("should zip two iterables together", () => {
    assert.eqArray([["a", 1], ["b", 2], ["c", 3]],
                   wu.zip("abc", [1, 2, 3]));
  });

  it("should stop with the shorter iterable", () => {
    assert.eqArray([["a", 1], ["b", 2], ["c", 3]],
                   wu.zip("abc", wu.count(1)));
  });
});
