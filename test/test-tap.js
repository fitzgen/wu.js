describe("wu.tap", () => {
  it("should perform side effects and yield the original item", () => {
    let i = 0;
    assert.eqArray([1, 2, 3],
                   wu.tap([1, 2, 3], x => i++));
    assert.equal(i, 3);
  });
});
