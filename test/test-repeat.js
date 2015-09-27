const wu = require("../wu");
const assert = require("../assert");
describe("wu.repeat", () => {
  it("should keep yielding its item", () => {
    const repeat = wu.repeat(3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
  });

  it("should repeat n times", () => {
    const repeat = wu.repeat(3, 2);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, undefined);
    assert.equal(repeat.next().done, true);
  });
});
