describe("wu.tee", () => {
  it("should clone iterables", () => {
    const factorials = wu(wu.count(1)).reductions((a, b) => a * b);
    const [copy1, copy2] = wu(factorials).tee();
    const i1 = iter(copy1);
    const i2 = iter(copy2);

    assert.equal(i1.next().value, 1);
    assert.equal(i1.next().value, 2);
    assert.equal(i1.next().value, 6);
    assert.equal(i1.next().value, 24);

    assert.equal(i2.next().value, 1);
    assert.equal(i2.next().value, 2);
    assert.equal(i2.next().value, 6);
    assert.equal(i2.next().value, 24);
  });
});
