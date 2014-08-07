---
title: zipWith
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.zipWith(fn, ...iterables)`

Given `n` iterables, yield `fn(itemFromIter1, itemFromIter2, ...,
itemFromIterN)` until the shortest iterable is exhausted. This is equivalent to
`wu.zip(...iterables).spreadMap(fn)`.

{% highlight js %}
wu.zipWith(Math.pow, wu.count(), wu.repeat(2));
// (0, 1, 4, 9, 16, 25, 36, 49, ...)
{% endhighlight %}
