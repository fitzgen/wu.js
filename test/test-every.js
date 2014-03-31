describe("wu.every", () => {
  it("should return true when the predicate succeeds for all items", () => {
    assert.equal(true, wu.every([1, 2, 3], x => typeof x === "number"));
  });

  it("should return false when the predicate fails for any item", () => {
    assert.equal(false, wu.every([1, 2, "3"], x => typeof x === "number"));
  });
});
