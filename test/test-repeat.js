describe("wu.repeat", () => {
  it("should keep yielding its item", () => {
    const repeat = iter(wu.repeat(3));
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
  });

  it("should repeat n times", () => {
    const repeat = iter(wu.repeat(3, 2));
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, undefined);
    assert.equal(repeat.next().done, true);
  });
});
