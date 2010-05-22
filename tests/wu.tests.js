module("Public API");

test("Maintains prototype chain",
     3,
     function () {
         ok(wu([1,2,3,4]) instanceof wu, "wu(arr) instanceof wu");
         ok(wu({}) instanceof wu, "wu(obj) instanceof wu");
         ok(wu(function () {}) instanceof wu, "wu(function) instanceof wu; This might not be possible...");
     });

test("Iteration API for Objects",
     3,
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
     });

test("Iteration API for Arrays",
     3,
     function () {
         var iterator = wu([1,2]);
         ok(iterator.next() === 1);
         ok(iterator.next() === 2);
         ok(iterator.next() instanceof wu.StopIteration);
     });

test("Iteration API for Strings",
     4,
     function () {
         var iterator = wu("Hi!");
         ok(iterator.next() === "H");
         ok(iterator.next() === "i");
         ok(iterator.next() === "!");
         ok(iterator.next() instanceof wu.StopIteration);
     });

test("Iteration API for Numbers",
     4,
     function () {
         var iterator = wu(3);
         ok(iterator.next() === 2);
         ok(iterator.next() === 1);
         ok(iterator.next() === 0);
         ok(iterator.next() instanceof wu.StopIteration);
     });
