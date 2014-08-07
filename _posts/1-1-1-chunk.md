---
title: chunk
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).chunk(n=2)`

##### `wu.chunk(n, iterable)` *[curryable](#curryable)*

Accumulate items from the iterable into arrays of size `n` and yield each
array.

{% highlight js %}
wu("abcdef").chunk(2);
// (["a", "b"], ["c", "d"], ["e", "f"])
wu("abcdef").chunk(3);
// (["a", "b", "c"], ["d", "e", "f"])
wu("abcdef").chunk(4);
// (["a", "b", "c", "d"], ["e", "f"])
{% endhighlight %}
