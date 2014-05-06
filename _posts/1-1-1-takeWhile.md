---
title: takeWhile
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.takeWhile(iterable, fn=Boolean)`
##### `wu(iterable).takeWhile(fn=Boolean)`

Yield items from the iterable while `fn(item)` is truthy.

{% highlight js %}
wu([2, 4, 6, 5, 8]).takeWhile(n => n % 2 === 0);
// (2, 4, 6)
wu(["foo", "bar", null, "baz"]).takeWhile();
// ("foo", "bar")
{% endhighlight %}
