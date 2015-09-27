const wu = require("../wu");
const assert = require("../assert");
describe("wu.find", () => {
  it("should return the first item that matches the predicate", () => {
    assert.deepEqual({ name: "rza" },
                    wu.find(x => x.name.match(/.za$/),
                            [{ name: "odb" },
                             { name: "method man" },
                             { name: "rza" },
                             { name: "gza" }]));
  });

  it("should return undefined if no items match the predicate", () => {
    assert.equal(undefined,
                 wu.find(x => x === "raekwon",
                         [{ name: "odb" },
                          { name: "method man" },
                          { name: "rza" },
                          { name: "gza" }]));
  });
});
