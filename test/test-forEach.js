describe("wu.forEach", () => {
  it("should iterate over every item", () => {
    const items = [];
    wu.forEach([1,2,3], x => items.push(x));
    assert.eqArray([1,2,3], items);
  });
});
