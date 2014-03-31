describe("wu.reductions", () => {
  it("should yield the intermediate reductions of the iterable", () => {
    assert.eqArray([1, 3, 6],
                   wu.reductions([1, 2, 3],
                                 (x, y) => x + y));
  });
});
