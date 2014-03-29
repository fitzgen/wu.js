describe("wu.compress", () => {
  it("should filter items based on truthiness of a corresponding item", () => {
    assert.eqArray([2, 4, 6],
                   wu.compress([1, 2, 3, 4, 5, 6],
                               [false, true, false, true, false, true]));
  });
});
