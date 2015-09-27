const wu = require("../wu");
const assert = require("../assert");
describe("wu.keys", () => {
  it("should iterate over keys", () => {
    assert.eqSet(new Set(["foo", "bar", "baz"]),
                 wu.keys({ foo: 1, bar: 2, baz: 3 }));
  });
});
