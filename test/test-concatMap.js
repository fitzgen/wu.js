describe("wu.concatMap", () => {
  it("should map the function over the iterable and concatenate results", () => {
    assert.eqArray([1, 1, 2, 4, 3, 9],
                   wu.concatMap([1, 2, 3], x => [x, x * x]));
  });
});
