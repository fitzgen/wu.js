---
title: slice
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).slice(start=0, stop=Infinity)`

##### `wu.slice(start, stop, iterable)` *[curryable](#curryable)*

Like `Array.prototype.slice`, but for any iterable.

`wu.slice(start, end, iterable)` is equivalent to
`wu(iterable).drop(start).take(end - start)`.

{% highlight js %}
wu.count(10).slice(1, 4);
// (11, 12, 13)
{% endhighlight %}
