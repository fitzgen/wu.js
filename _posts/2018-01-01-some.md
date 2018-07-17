---
title: some
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).some(fn=Boolean)`

##### `wu.some(fn, iterable)` *[curryable](#curryable)*

Return `true` if `fn(item)` is truthy for any of the items in the iterable,
otherwise return `false`.

{% highlight js %}
wu([false, false, true, false]).some();
// true
wu([1,2,3,4,5]).some(n => n > 10);
// false
{% endhighlight %}
