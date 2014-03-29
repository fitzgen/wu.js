describe("wu.flatten", () => {
  it("should flatten iterables", () => {
    assert.eqArray(["I", "like", "LISP"],
                   wu.flatten(["I", ["like", ["LISP"]]]));
  });

  it("should shallowly flatten iterables", () => {
    assert.eqArray([1, 2, 3, [[4]]],
                   wu.flatten([1, [2], [3, [[4]]]], true));
  });
});
