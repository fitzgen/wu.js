"use strict";
describe("wu.repeat", (function() {
  it("should keep yielding its item", (function() {
    var repeat = wu.repeat(3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
  }));
  it("should repeat n times", (function() {
    var repeat = wu.repeat(3, 2);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, 3);
    assert.equal(repeat.next().value, undefined);
    assert.equal(repeat.next().done, true);
  }));
}));
