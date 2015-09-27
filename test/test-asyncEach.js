const wu = require("../wu");
const assert = require("../assert");
describe("wu.asyncEach", () => {
  it("should iterate over each item", () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let n = 0;

    return wu(arr)
      .asyncEach(x => {
        n++;
        const start = Date.now();
        while (Date.now() - start <= 3) {
          // Kill time.
        }
      }, 3)
      .then(() => {
        assert.equal(n, arr.length);
      });
  });
});
