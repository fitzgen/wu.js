---
title: dropWhile
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.dropWhile(iterable, fn=Boolean)`
##### `wu(iterable).dropWhile(fn=Boolean)`

Drop items from the iterable while the predicate is truthy.

{% highlight js %}
wu([2, 4, 6, 5, 8, 10]).dropWhile(x => x % 2 === 0)
// (5, 8, 10)
{% endhighlight %}
