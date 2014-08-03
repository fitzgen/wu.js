describe("wu.reductions", () => {
  it("should yield the intermediate reductions of the iterable", () => {
    assert.eqArray([1, 3, 6],
                   wu.reductions((x, y) => x + y, [1, 2, 3]));
  });
});
