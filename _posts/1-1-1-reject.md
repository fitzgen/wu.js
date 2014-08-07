---
title: reject
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).reject(fn=Boolean)`

##### `wu.reject(fn, iterable)` *[curryable](#curryable)*

For each item in the iterable, yield the item if `!fn(item)` is truthy.

{% highlight js %}
wu([false, true, false, true]).reject()
// (false, false)
wu([1, 2, 3, 4]).reject(x => x % 2 === 0)
// (1, 3)
{% endhighlight %}

