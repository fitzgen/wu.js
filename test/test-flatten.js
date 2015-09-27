const wu = require("../wu");
const assert = require("../assert");
describe("wu.flatten", () => {
  it("should flatten iterables", () => {
    assert.eqArray(["I", "like", "LISP"],
                   wu(["I", ["like", ["LISP"]]]).flatten());
  });

  it("should shallowly flatten iterables", () => {
    assert.eqArray([1, 2, 3, [[4]]],
                   wu.flatten(true, [1, [2], [3, [[4]]]]));
  });
});
