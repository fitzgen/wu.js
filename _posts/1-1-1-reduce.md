---
title: reduce
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.reduce(iterable, fn[, initial])`
##### `wu(iterable).reduce(fn[, initial])`

Reduce the iterable from left to right with the binary function `fn`. If
`initial` is supplied, start with that value, otherwise use the first value in
the iterable.

{% highlight js %}
const plus = (x, y) => x + y;

wu.reduce([1,2,3,4,5], plus);
// 15
wu.reduce([1,2,3,4,5], plus, 100);
// 115
{% endhighlight %}
