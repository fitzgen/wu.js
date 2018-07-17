---
title: curryable
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.curryable(fn, expected=fn.length)`

Returns a new function that keeps currying until it receives `expected`
arguments, at which point it evaluates `fn` with those arguments applied.

[Learn more about currying at Wikipedia.](http://en.wikipedia.org/wiki/Currying)

Most of the functions attached directly to `wu` (eg `wu.filter(fn, iterable)`,
as opposed to `wu(iterable).filter(fn)`) are curryable.

You generally shouldn't need to explicitly specify the number of arguments
expected unless you're using rest parameters or optional parameters (which don't
add increment the function's `length` property).

{% highlight js %}
const add = wu.curryable((a, b) => a + b);

add(3, 4);
// 7

const add2 = add(2);
add2(10)
// 12

add()()()()()()()()();
// function

const sum = wu.reduce(add, 0);
sum([1,2,3,4,5]);
// 15

const hasProp = wu.curryable((prop, obj) => prop in obj);
const withAlias = wu.filter(hasProp("alias"));

const wantedDeadOrAlive = [
  { name: "Sammy Jones",    alias: "Crime Time"  },
  { name: "Jessica Carter", alias: "Sugar Killa" },
  { name: "Nick Fitzgerald"                      }
];

withAlias(wantedDeadOrAlive);
// ( { name: "Sammy Jones",    alias: "Crime Time"  },
//   { name: "Jessica Carter", alias: "Sugar Killa" } )
{% endhighlight %}
