---
title: take
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.takeWhile(iterable, n)`
##### `wu(iterable).takeWhile(n)`

Yield the first `n` items from the iterable.

{% highlight js %}
wu.count().take(5);
// (0, 1, 2, 3, 4)
{% endhighlight %}
