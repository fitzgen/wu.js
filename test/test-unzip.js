const wu = require("../wu");
const assert = require("../assert");
describe("wu.unzip", () => {
  it("should create iterables from zipped items", () => {
    const pairs = [
      ["one", 1],
      ["two", 2],
      ["three", 3]
    ];
    const [i1, i2] = wu(pairs).unzip();
    assert.eqArray(["one", "two", "three"], [...i1]);
    assert.eqArray([1, 2, 3], [...i2]);
  });
});
