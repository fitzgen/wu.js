describe("wu.enties", () => {
  it("should iterate over keys", () => {
    const expected = new Map([["foo", 1], ["bar", 2], ["baz", 3]]);
    for (let [k, v] of wu.entries({ foo: 1, bar: 2, baz: 3 })) {
      assert.equal(expected.get(k), v);
    }
  });
});
