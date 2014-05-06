---
title: reductions
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.reductions(iterable, fn[, initial])`
##### `wu(iterable).reductions(fn[, initial])`

Similar to [`wu.reduce`](#reduce) but yields each intermediate reduction as the
iterable is reduced.

{% highlight js %}
const multiply = (x, y) => x * y;
wu.count(1).reductions(multiply);
// (1, 2, 6, 24, 120, ...)
{% endhighlight %}
