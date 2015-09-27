const wu = require("../wu");
const assert = require("../assert");
describe("wu.values", () => {
  it("should iterate over values", () => {
    assert.eqSet(new Set([1, 2, 3]),
                 wu.values({ foo: 1, bar: 2, baz: 3 }));
  });
});
