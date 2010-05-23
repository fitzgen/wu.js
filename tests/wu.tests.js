module("Wu itself");

test("Maintains prototype chain",
     function () {
         ok(wu([1,2,3,4]) instanceof wu, "wu(arr) instanceof wu");
         ok(wu({}) instanceof wu, "wu(obj) instanceof wu");
         ok(wu("Hi!") instanceof wu, "wu('Hi!') instanceof wu");
         ok(wu(function () {}) instanceof wu, "wu(function) instanceof wu; This might not be possible...");
     });

module("Iteration API");

test("Objects",
     function () {
         var next,
             iterator = wu({ foo: 1, bar: 2 });

         next = iterator.next();
         ok((next[0] === "foo" && next[1] === 1) ||
            (next[0] === "bar" && nexxt[1] === 2));

         next = iterator.next();
         ok((next[0] === "foo" && next[1] === 1) ||
            (next[0] === "bar" && next[1] === 2));

         ok(iterator.next() instanceof wu.StopIteration);

         ok(wu.eq(wu({ foo: 1 }).toArray(), [["foo", 1]]), "wu({foo:1}).toArray() -> [['foo', 1]]");
     });

test("Arrays",
     function () {
         var iterator = wu([1,2]);
         ok(iterator.next() === 1);
         ok(iterator.next() === 2);
         ok(iterator.next() instanceof wu.StopIteration);

         ok(wu.eq(wu([1,2,3]).toArray(), [1,2,3]), "wu([1,2,3]).toArray() -> [1,2,3]");
     });

test("Strings",
     function () {
         var iterator = wu("Hi!");
         ok(iterator.next() === "H");
         ok(iterator.next() === "i");
         ok(iterator.next() === "!");
         ok(iterator.next() instanceof wu.StopIteration);

         ok(wu.eq(wu("Hi!").toArray(), ["H", "i", "!"]), "wu('Hi!').toArray() -> ['H', 'i', '!']");
     });

test("Numbers",
     function () {
         var iterator = wu(3);
         ok(iterator.next() === 2);
         ok(iterator.next() === 1);
         ok(iterator.next() === 0);
         ok(iterator.next() instanceof wu.StopIteration);
     });

module("Wu methods");

test("wu.has",
     function () {
         ok(wu.has([1,2,3], 3), "[1,2,3] has 3");
         ok( !wu.has([1,2,3], 4), "[1,2,3] does not have 4");
         ok(wu.has([1,{ foo: 2 },3], { foo: 2 }), "[1,{foo:2},3] has {foo:2}");
         ok( !wu.has([1,{ foo: 2 },3], { foo: 4 }), "[1,{foo:2},3] doesn't have {foo:4}");
     });

test("wu.eq",
     function () {
         // Objects
         ok(wu.eq({}, {}), "wu.eq w/ empty objects");
         ok(wu.eq({ foo: 1, bar: 2 }, { foo: 1, bar: 2 }), "wu.eq w/ non-empty objects");
         ok(wu.eq({ foo: { bar: 1 } }, { foo: { bar: 1 } }), "wu.eq w/ nested objects");
         ok( !wu.eq({}, { bar: 1}), "wu.eq recognizes non-equal objects");

         // Arrays
         ok(wu.eq([], []), "wu.eq w/ empty arrays");
         ok(wu.eq([1,2,3], [1,2,3]), "wu.eq w/ non-empty arrays");
         ok(wu.eq([1,2,[3,4]], [1,2,[3,4]]), "wu.eq w/ nested arrays");
         ok( !wu.eq([1,2], [1,2,3]), "wu.eq recognizes non-equal arrays");

         // RegExps
         ok(wu.eq(/a/, /a/), "Simple regexes are equal.");
         ok(wu.eq(/a/i, /a/i), "Case insensitive regexes are equal.");
         ok( !wu.eq(/a/i, /a/), "Case insensitive is not equal to non-case insensitive.");
         ok(wu.eq(/a/g, /a/g), "Global match regexes are equal.");
         ok( !wu.eq(/a/g, /a/), "Global match regexes aren't equal to non-global match regexes.");
         ok(wu.eq(/a/m, /a/m), "Multiline regexes are equal.");
         ok( !wu.eq(/a/m, /a/), "Multiline regexes aren't equal to non-multiline regexes.");

         // Dates
         ok(wu.eq(new Date(1), new Date(1)), "Identical dates are equal.");
         ok( !wu.eq(new Date(0), new Date(1)), "Non-identical dates aren't equal.");

         // Mix and match
         ok(wu.eq([{ foo: 1 }, { bar: 2 }], [{ foo: 1 }, { bar: 2 }]), "Objects inside arrays.");
         ok(wu.eq({ foo: [1,2] }, { foo: [1,2] }), "Arrays inside objects");

         // Non-equal
         ok( !wu.eq({}, []), "Arrays and objects are not equal.");
         ok( !wu.eq({}, new Date), "Dates and objects are not equal.");
         ok( !wu.eq({}, /regex/), "Regexps and objects are not equal.");
         ok( !wu.eq([], new Date), "Arrays and dates are not equal.");
         ok( !wu.eq([], /regex/), "Arrays and regexes are not equal.");
         ok( !wu.eq(/regex/, new Date), "Regexes and dates are not equal.");
     });

test("wu.all",
     function () {
         ok(wu.all([0,2,4,6,8], function (x) { return x % 2 === 0; }),
            "wu.all([0,2,4,6,8], even?)");
         ok( !wu.all([0,2,4,6,8,9], function (x) { return x % 2 === 0; }),
            "wu.all([0,2,4,6,8,9], even?) is false");
     });

test("wu.any",
     function () {
         ok(wu.any([1,2,3,4], function (x) { return x % 2 === 0; }),
            "wu.any([1,2,3,4], even?)");
         ok( !wu.any([1,3,5], function (x) { return x % 2 === 0; }),
            "wu.all([1,3,5], even?) is false");
     });

test("wu.bind",
     function () {
         var obj = {};
         ok(wu.bind(obj, function () { return this === obj; })(),
            "this === obj");
         ok(wu.bind(obj,
                    function (uno) {
                        return this === obj && uno === 1;
                    },
                    1)(),
            "this === obj && uno === 1");
     });

test("wu.chain",
     function () {
         ok(wu.eq(wu.chain([1], [2], [3], [4]).toArray(), [1,2,3,4]),
            "wu.chain([1],[2],[3],[4]).toArray() -> [1,2,3,4]");
     });

test("wu.compose",
     function () {
         var plusOne = function (x) {
             return x + 1;
         },
         timesTwo = function (x) {
             return x * 2;
         };

         ok(wu.compose(timesTwo, plusOne)(3) === 8, "timesTwo(plusOne(3)) === 8");
     });

test("wu.curry",
     function () {
         var add = function (a, b) {
             return a + b;
         };
         ok(wu.curry(add, 5)(2) === 7, "wu.curry(add, 5)(2) === 7");
     });

test("wu.filter",
     function () {
         ok(wu.eq(wu.filter([1,2,3,4], function (x) { return x % 2 === 0; }).toArray(),
                  [2,4]),
            "wu.filter([1,2,3,4], even?).toArray() -> [2,4]");
     });

test("wu.map",
     function () {
         ok(wu.eq(wu.map(wu.range(4), function (x) { return x+1; }).toArray(),
                  [1,2,3,4]),
            "wu.map(wu.range(4), function (x) { return x+1; }).toArray() -> [1,2,3,4]");
     });

test("wu.match",
     function () {
         // Constructor matching
         ok(wu.match(Object, true)({}), "Objects matches {}");
         ok(wu.match(Array, true)([]), "Array matches []");
         ok(wu.match(RegExp, true)(/regex/), "RegExp matches /regex/");
         ok(wu.match(wu.Iterator, true)(wu([1,2])), "wu.Iterator matches wu([1,2])");
         ok(wu.match(Number, true)(1), "Number matches 1");
         ok(wu.match(String, true)("hello"), "String matches 'hello'");

         // Nested constructor matching
         ok(wu.match({ foo: Object }, true)({ foo: { bar: 1 } }), "wu.match w/ nested Object constructor");
         ok(wu.match({ foo: Array }, true)({ foo: [1,2] }), "wu.match w/ nested Array constructor");
         ok(wu.match({ foo: RegExp }, true)({ foo: /foo/ }), "wu.match w/ nested RegExp constructor");
         ok(wu.match({ foo: Number }, true)({ foo: 2 }), "wu.match w/ nested Number constructor");
         ok(wu.match({ foo: String }, true)({ foo: "foo" }), "wu.match w/ nested String constructor");
         ok(wu.match([Object], true)([{ bar: 1 }]), "wu.match w/ Object constructor in array");
         ok(wu.match([Array], true)([[1,2]]), "wu.match w/ Array constructor in array");
         ok(wu.match([RegExp], true)([/foo/]), "wu.match w/ RegExp constructor in array");
         ok(wu.match([Number], true)([2]), "wu.match w/ Number constructor in array");
         ok(wu.match([String], true)(["string"]), "wu.match w/ String constructor in array");

         // Objects
         ok(wu.match({}, true)({}), "wu.match w/ empty objects");
         ok(wu.match({ foo: 1, bar: 2 }, true)({ foo: 1, bar: 2 }), "wu.match w/ non-empty objects");
         ok(wu.match({ foo: { bar: 1 } }, true)({ foo: { bar: 1 } }), "wu.match w/ nested objects");
         try {
             ok(wu.match({ bar: 1 }, false)({}), "This should never happen");
         } catch (e) {
             ok(e.message === "The form did not match any given pattern.",
                "wu.match recognizes non-equal objects and throws error.");
         }

         // Arrays
         ok(wu.match([], true)([]), "wu.eq w/ empty arrays");
         ok(wu.match([1,2,3], true)([1,2,3]), "wu.eq w/ non-empty arrays");
         ok(wu.match([1,2,[3,4]], true)([1,2,[3,4]]), "wu.eq w/ nested arrays");
         try {
             ok(wu.match([1,2], true)([1,2,3]), "This should never happen");
         } catch (e) {
             ok(e.message === "The form did not match any given pattern.",
                "wu.match recognizes non-equal arrays and throws error.");
         }

         // wu.match.___
         ok(wu.match(wu.match.___, true)({}), "wu.match.___ matches objects.");
         ok(wu.match(wu.match.___, true)([]), "wu.match.___ matches arrays.");
         ok(wu.match(wu.match.___, true)(new Date), "wu.match.___ matches dates.");
         ok(wu.match(wu.match.___, true)(/regex/), "wu.match.___ matches regexes.");
         ok(wu.match(wu.match.___, true)(1), "wu.match.___ matches numbers.");
         ok(wu.match(wu.match.___, true)("foobar"), "wu.match.___ matches strings.");
         ok(wu.match(wu.match.___, true)(true), "wu.match.___ matches true.");
         ok(wu.match(wu.match.___, true)(false), "wu.match.___ matches false.");
         ok(wu.match(wu.match.___, true)(null), "wu.match.___ matches null.");
         ok(wu.match(wu.match.___, true)(undefined), "wu.match.___ matches undefined.");
     });

test("wu.range",
     function () {
         ok(wu.eq(wu.range(3).toArray(), [0,1,2]),
            "wu.range(3).toArray() -> [0,1,2]");
         ok(wu.eq(wu.range(3, 6).toArray(), [3,4,5]),
            "wu.range(3, 6).toArray() -> [3,4,5]");
         ok(wu.eq(wu.range(0, 10, 2).toArray(), [0,2,4,6,8]),
            "wu.range(0, 10, 2).toArray() -> [0,2,4,6,8]");
     });

test("wu.zip",
     function () {
         ok(wu.eq(wu.zip([1,2,3], [4,5,6]).toArray(),
                  [[1,4], [2,5], [3,6]]),
            "wu.zip([1,2,3], [4,5,6]).toArray() -> [[1,4], [2,5], [3,6]]");
     });

module("Augmented function methods");

test("wu(fn).all",
     function () {
         ok(wu(function (x) { return x % 2 === 0; }).all([0,2,4,6,8]),
            "wu(even?).all([0,2,4,6,8])");
         ok( !wu(function (x) { return x % 2 === 0; }).all([0,2,4,6,8,9]),
            "wu(even?).all([0,2,4,6,8,9]) is false");
     });

test("wu(fn).any",
     function () {
         ok(wu(function (x) { return x % 2 === 0; }).any([1,2,3,4]),
            "wu(even?).any([1,2,3,4])");
         ok( !wu(function (x) { return x % 2 === 0; }).any([1,3,5]),
            "wu(even?).any([1,3,5]) is false");
     });

test("wu(fn).bind",
     function () {
         var obj = {};
         ok(wu(function () { return this === obj; }).bind(obj)(),
            "this === obj");
         ok(wu(function (uno) {
                   return this === obj && uno === 1;
               }).bind(obj, 1)(),
            "this === obj && uno === 1");
     });

test("wu(fn).compose",
     function () {
         var plusOne = function (x) {
             return x + 1;
         },
         timesTwo = function (x) {
             return x * 2;
         };

         ok(wu(timesTwo).compose(plusOne)(3) === 8, "timesTwo(plusOne(3)) === 8");
     });

test("wu(fn).filter",
     function () {
         ok(wu.eq(wu(function (x) { return x % 2 === 0; }).filter([1,2,3,4]).toArray(),
                  [2,4]),
            "wu(even?).filter([1,2,3,4]).toArray() -> [2,4]");
     });

test("wu(fn).map",
     function () {
         ok(wu.eq(wu(function (x) { return x + 1; }).map([1,2,3,4]).toArray(),
                  [2,3,4,5]),
            "wu([+1).map([1,2,3,4]).toArray() -> [2,3,4,5]");
     });

module("Iterator methods");

test("wu.Iterator.all",
     function () {
         ok(wu([0,2,4]).all(function (x) { return x % 2 === 0; }),
            "wu([0,2,4]).all(even?)");
         ok( !wu([0,2,4,5]).all(function (x) { return x % 2 === 0; }),
            "wu([0,2,4,5]).all(even?) is false");
     });

test("wu.Iterator.any",
     function () {
         ok(wu([0,2,4,5]).any(function (x) { return x % 2 === 1; }),
            "wu([0,2,4,5]).any(odd?)");
         ok( !wu([0,2,4]).any(function (x) { return x % 2 === 1; }),
            "wu([0,2,4]).any(odd?) is false");
     });

test("wu.Iterator.chain",
     function () {
         ok(wu.eq(wu([1,2,3]).chain([4], [5], [6]).toArray(), [1,2,3,4,5,6]),
            "wu([1,2,3]).chain([4], [5], [6]).toArray() -> [1,2,3,4,5,6]");
     });

test("wu.Iterator.filter",
     function () {
         ok(wu.eq(wu([1,2,3,4]).filter(function (x) { return x % 2 === 0; }).toArray(),
                  [2,4]),
            "wu([1,2,3,4]).filter(even?).toArray() -> [2,4]");
     });

test("wu.Iterator.has",
     function () {
         ok(wu([0,1,2]).has(2), "wu([0,1,2]).has(2)");
         ok( !wu([0,1,2]).has(3), "wu([0,1,2]).has(3) is false");
     });

test("wu.Iterator.map",
     function () {
         ok(wu.eq(wu(4).map(function (x) { return x + 1; }).toArray(),
                  [4,3,2,1]),
           "wu(4).map(function (x) { return x + 1; }).toArray() -> [4,3,2,1]");
     });

test("wu.Iterator.zip",
     function () {
         ok(wu.eq(wu([1,2,3]).zip([4,5,6]).toArray(),
                  [[1,4], [2,5], [3,6]]),
            "wu([1,2,3]).zip([4,5,6]) -> [[1,4], [2,5], [3,6]]");
     });

