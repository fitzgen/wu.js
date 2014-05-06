---
title: slice
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.slice(iterable, start=0, stop=Infinity)`
##### `wu(iterable).slice(start=0, stop=Infinity)`

Like `Array.prototype.slice`, but for any iterable.

{% highlight js %}
wu.count(10).slice(1, 4);
// (11, 12, 13)
{% endhighlight %}
