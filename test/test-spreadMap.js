const wu = require("../wu");
const assert = require("../assert");
describe("wu.spreadMap", () => {
  it("should map the function over the iterable with spread arguments", () => {
    assert.eqArray([32, 9, 1000],
                   wu.spreadMap(Math.pow, [[2, 5], [3, 2], [10, 3]]));
  });
});
