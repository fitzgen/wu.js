describe("wu.tee", () => {
  it("should clone iterables", () => {
    const factorials = wu.reductions((a, b) => a * b, wu.count(1));
    const [copy1, copy2] = wu.tee(factorials);
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
