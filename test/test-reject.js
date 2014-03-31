describe("wu.reject", () => {
  it("should yield items for which the predicate is false", () => {
    assert.eqArray([1, true, {}],
                   wu.reject([1, "a", true, "b", {}, "c"],
                             x => typeof x === "string"));
  });
});
