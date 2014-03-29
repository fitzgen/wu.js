describe("wu.map", () => {
  it("should map the function over the iterable", () => {
    assert.eqArray([1, 4, 9],
                   wu.map([1, 2, 3], x => x * x));
  });
});
