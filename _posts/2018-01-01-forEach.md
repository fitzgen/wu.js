---
title: forEach
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).forEach(fn)`

##### `wu.forEach(fn, iterable)` *[curryable](#curryable)*

Call `fn(item)` for each item in the iterable.

Note that this can cause slow script dialogs or even permanently block the main
thread if used with large or infite iterators. In such cases, either use this
method inside a `Worker` (preferrable) or use [`wu.asyncEach`](#asyncEach).

{% highlight js %}
wu.forEach(x => console.log("x is " + x),
           [1, 2, 3]);
// console.log: "x is 1"
// console.log: "x is 2"
// console.log: "x is 3"
{% endhighlight %}
