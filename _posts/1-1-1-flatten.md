---
title: flatten
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).flatten(shallow=false)`

##### `wu.flatten(shallow, iterable)` *[curryable](#curryable)*

Flatten the given iterable. If `shallow` is truthy, only flatten by one level.

{% highlight js %}
wu(["I", ["like", ["LISP"]]]).flatten()
// ("I", "like", "LISP")
wu.flatten(true, [1, [2], [3, [[4]]]])
// (1, 2, 3, [[4]]),
{% endhighlight %}
