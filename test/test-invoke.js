const wu = require("../wu");
const assert = require("../assert");
describe("wu.invoke", () => {
  it("should yield the method invokation on each item", () => {
    function Greeter(name) {
      this.name = name
    }
    Greeter.prototype.greet = function (tail) {
      return "hello " + this.name + tail;
    };
    assert.eqArray(["hello world!", "hello test!"],
                   wu.invoke("greet", "!",
                             [new Greeter("world"), new Greeter("test")]));
  });
});
