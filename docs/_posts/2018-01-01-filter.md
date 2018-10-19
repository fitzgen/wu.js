---
title: filter
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).filter(fn=Boolean)`

##### `wu.filter(fn, iterable)` *[curryable](#curryable)*

Yield only the items from the iterable for which `fn(item)` is truthy.

{% highlight js %}
wu([false, true, false, true]).filter()
// (true, true)
wu([1, 2, 3, 4]).filter(x => x % 2 === 0)
// (2, 4)
{% endhighlight %}
