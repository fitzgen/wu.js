const wu = require("../wu");
const assert = require("../assert");
describe("wu.take", () => {
  it("should yield as many items as requested", () => {
    assert.eqArray([0, 1, 2, 3, 4],
                   wu.take(5, wu.count()));
  });
});
