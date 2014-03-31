describe("wu.some", () => {
  it("should return true if any item matches the predicate", () => {
    assert.ok(wu.some([1,2,3], x => x % 2 === 0));
  });

  it("should return false if no items match the predicate", () => {
    assert.ok(!wu.some([1,2,3], x => x % 5 === 0));
  });
});
