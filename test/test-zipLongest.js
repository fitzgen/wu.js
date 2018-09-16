const wu = require("../wu");
const assert = require("../assert");
describe("wu.zipLongest", () => {

  var tests =[
    {args: ["a", [1,2,3]],              expected: [["a", 1], [,2], [,3]]},
    {args: [["a"], [1,2,3]],            expected: [["a", 1], [,2], [,3]]},
    {args: [["a","b","c"], [1,2]],      expected: [["a", 1], ["b",2], ["c", ]]},
    {args: ["a", [1,2,3], [7,8,9,10]],  expected: [["a", 1, 7], [ , 2, 8], [ , 3, 9], [ , , 10]]},
    {args: [["a"], [1,2,3,4], [7,8,9]], expected: [["a", 1, 7], [ , 2, 8], [ , 3, 9], [ , 4, ]]}
  ];

  tests.forEach(test => {
    it('should stop with the longest iterable', () =>
    {
      assert.eqArray(test.expected,
          wu.zipLongest(...test.args));
    })
  });
});

