const wu = require("../wu");
const assert = require("../assert");
describe("wu.entries", () => {
  it("should iterate over entries", () => {
    const expected = new Map([["foo", 1], ["bar", 2], ["baz", 3]]);
    for (let [k, v] of wu.entries({ foo: 1, bar: 2, baz: 3 })) {
      assert.equal(expected.get(k), v);
    }
  });
});
