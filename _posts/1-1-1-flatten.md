---
title: flatten
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.flatten(iterable, shallow=false)`
##### `wu(iterable).flatten(shallow=false)`

Flatten the given iterable. If `shallow` is truthy, only flatten by one level.

{% highlight js %}
wu.flatten(["I", ["like", ["LISP"]]])
// ("I", "like", "LISP")
wu.flatten([1, [2], [3, [[4]]]], true)
// (1, 2, 3, [[4]]),
{% endhighlight %}
