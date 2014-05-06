---
title: drop
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.drop(iterable, n)`
##### `wu(iterable).drop(n)`

Drop the first `n` items from the iterable.

{% highlight js %}
wu([5, 4, 3, 2, 1]).drop(2);
// (3, 2, 1)
{% endhighlight %}
