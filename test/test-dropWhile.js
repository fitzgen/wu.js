describe("wu.dropWhile", () => {
  it("should drop items while the predicate is true", () => {
    const count = wu.dropWhile(wu.count(), x => x < 5);
    assert.equal(count.next().value, 5);
  });
});
