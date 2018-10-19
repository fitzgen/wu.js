---
title: take
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).take(n)`

##### `wu.take(n, iterable)` *[curryable](#curryable)*

Yield the first `n` items from the iterable.

{% highlight js %}
wu.count().take(5);
// (0, 1, 2, 3, 4)
{% endhighlight %}
