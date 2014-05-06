---
title: enumerate
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.enumerate(iterable)`
##### `wu(iterable).enumerate()`

For each item in the iterable, yield a pair `[item, index]`.

{% highlight js %}
wu.enumerate(["cats", "dogs", "rats", "hogs"]);
// (["cats", 0], ["dogs", 1], ["rats", 2], ["hogs", 3])
{% endhighlight %}
