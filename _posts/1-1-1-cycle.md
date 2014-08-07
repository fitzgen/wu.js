---
title: cycle
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).cycle()`

##### `wu.cycle(iterable)` *[curryable](#curryable)*

Yield each item from the iterable and when the iterable is exhausted, start
yielding its items all over again, and again, and again.

{% highlight js %}
wu.cycle([1, 2, 3])
// (1, 2, 3, 1, 2, 3, 1, 2, 3, ...)
{% endhighlight %}
