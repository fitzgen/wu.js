---
title: reduce
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).reduce(fn[, initial])`

##### `wu.reduce(fn, initial, iterable)` *[curryable](#curryable)*

Reduce the iterable from left to right with the binary function `fn`. If
`initial` is supplied, start with that value, otherwise use the first value in
the iterable.

{% highlight js %}
const plus = (x, y) => x + y;

wu([1,2,3,4,5]).reduce(plus);
// 15

wu.reduce(plus, 100, [1,2,3,4,5]);
// 115
{% endhighlight %}
