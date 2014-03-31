describe("wu.reduce", () => {
  it("should reduce the iterable with the function", () => {
    assert.equal(6, wu.reduce([1,2,3], (x, y) => x + y));
  });

  it("should accept an initial state for the reducer function", () => {
    assert.equal(16, wu.reduce([1,2,3], (x, y) => x + y, 10));
  });
});
