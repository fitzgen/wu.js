---
title: concatMap
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).concatMap(fn)`

##### `wu.concatMap(fn, iterable)` *[curryable](#curryable)*

Applies the given function to each item in the iterable and yields each item
from the result.

{% highlight js %}
wu([1, 2, 3]).concatMap(x => [x, x * x])
// (1, 1, 2, 4, 3, 9)
{% endhighlight %}
