const wu = require("../wu");
const assert = require("../assert");
describe("wu.tap", () => {
  it("should perform side effects and yield the original item", () => {
    let i = 0;
    assert.eqArray([1, 2, 3],
                   wu.tap(x => i++, [1, 2, 3]));
    assert.equal(i, 3);
  });
});
