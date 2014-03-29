describe("wu.filter", () => {
  it("should filter based on the predicate", () => {
    assert.eqArray(["a", "b", "c"],
                   wu.filter([1, "a", true, "b", {}, "c"],
                             x => typeof x === "string"));
  });
});
