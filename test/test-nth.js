const wu = require("../wu");
const assert = require("../assert");
describe("wu.nth", () => {
  it("should return the nth item in the iterable", () => {
    assert.equal(3,
                 wu.nth(3, [0, 1, 2, 3, 4]));
  });

  it("should return undefined if the index is negative", () => {
    assert.equal(undefined,
                 wu.nth(-1, []));
  });

  it("should not consume if the index is negative", () => {
    const iterable = wu([0, 1, 2]);
    iterable.nth(-1);
    assert.equal(0,
                 iterable.next().value);
  });

  it("should return undefined if the index is out of bounds", () => {
    assert.equal(undefined,
                 wu.nth(0, []));
    assert.equal(undefined,
                 wu.nth(3, ['a', 'b', 'c']));
  });
});
