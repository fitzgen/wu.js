---
title: concatMap
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.concatMap(iterable, fn)`
##### `wu(iterable).concatMap(fn)`

Applies the given function to each item in the iterable and yields each item
from the result.

{% highlight js %}
wu([1, 2, 3]).map(x => [x, x * x])
// (1, 1, 2, 4, 3, 9)
{% endhighlight %}
