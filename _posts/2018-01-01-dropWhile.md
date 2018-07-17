---
title: dropWhile
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).dropWhile(fn=Boolean)`

##### `wu.dropWhile(fn, iterable)` *[curryable](#curryable)*

Drop items from the iterable while the predicate is truthy.

{% highlight js %}
wu([2, 4, 6, 5, 8, 10]).dropWhile(x => x % 2 === 0)
// (5, 8, 10)
{% endhighlight %}
