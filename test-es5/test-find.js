"use strict";
describe("wu.find", (function() {
  it("should return the first item that matches the predicate", (function() {
    assert.deepEqual({name: "rza"}, wu.find((function(x) {
      return x.name.match(/.za$/);
    }), [{name: "odb"}, {name: "method man"}, {name: "rza"}, {name: "gza"}]));
  }));
  it("should return undefined if no items match the predicate", (function() {
    assert.equal(undefined, wu.find((function(x) {
      return x === "raekwon";
    }), [{name: "odb"}, {name: "method man"}, {name: "rza"}, {name: "gza"}]));
  }));
}));
