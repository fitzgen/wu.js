---
title: some
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.some(iterable, fn=Boolean)`
##### `wu(iterable).some(fn=Boolean)`

Return `true` if `fn(item)` is truthy for any of the items in the iterable,
otherwise return `false`.

{% highlight js %}
wu.some([false, false, true, false]);
// true
wu([1,2,3,4,5]).some(n => n > 10);
// false
{% endhighlight %}
