---
title: forEach
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.forEach(iterable, fn)`
##### `wu(iterable).forEach(fn)`

Call `fn(item)` for each item in the iterable.

Note that this can cause slow script dialogs or even permanently block the main
thread if used with large or infite iterators. In such cases, either use this
method inside a `Worker` (preferrable) or use [`wu.asyncEach`](#asyncEach).

{% highlight js %}
wu.forEach([1,2,3], x => console.log("x is " + x));
// console.log: "x is 1"
// console.log: "x is 2"
// console.log: "x is 3"
{% endhighlight %}
