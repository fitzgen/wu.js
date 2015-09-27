const wu = require("../wu");
const assert = require("../assert");
describe("wu.chunk", () => {
  it("should chunk items into tuples", () => {
    assert.eqArray([[1,2,3], [4,5,6]],
                   wu.chunk(3, [1,2,3,4,5,6]));
  });
});
