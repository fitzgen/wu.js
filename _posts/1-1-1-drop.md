---
title: drop
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).drop(n)`

##### `wu.drop(n, iterable)` *[curryable](#curryable)*

Drop the first `n` items from the iterable.

{% highlight js %}
wu([5, 4, 3, 2, 1]).drop(2);
// (3, 2, 1)
{% endhighlight %}
