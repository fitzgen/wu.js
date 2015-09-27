const wu = require("../wu");
const assert = require("../assert");
describe("wu.cycle", () => {
  it("should keep yielding items from the original iterable", () => {
    let i = 0;
    const arr = [1, 2, 3];
    for (let x of wu.cycle(arr)) {
      assert.equal(x, arr[i % 3]);
      if (i++ > 9) {
        break;
      }
    }
  });
});
