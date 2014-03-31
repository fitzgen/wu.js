describe("wu.find", () => {
  it("should return the first item that matches the predicate", () => {
    assert.deepEqual({ name: "rza" },
                    wu.find([{ name: "odb" },
                             { name: "method man" },
                             { name: "rza" },
                             { name: "gza" }],
                            x => x.name.match(/.za$/)));
  });

  it("should return undefined if no items match the predicate", () => {
    assert.equal(undefined,
                 wu.find([{ name: "odb" },
                          { name: "method man" },
                          { name: "rza" },
                          { name: "gza" }],
                         x => x === "raekwon"));
  });
});
