const wu = require("../wu");
const assert = require("../assert");
describe("wu.reduce", () => {
  it("should reduce the iterable with the function", () => {
    assert.equal(6, wu([1,2,3]).reduce((x, y) => x + y));
  });

  it("should accept an initial state for the reducer function", () => {
    assert.equal(16, wu.reduce((x, y) => x + y, 10, [1,2,3]));
  });
});
