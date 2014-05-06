---
title: every
---
#### [{{ page.title }}](#{{ page.title | slugify }})
##### `wu.every(iterable, fn=Boolean)`
##### `wu(iterable).every(fn=Boolean)`

Return `true` if `fn(item)` is truthy for every item in the iterable, otherwise
return `false`.

{% highlight js %}
wu.every([true, 36, "chambers"]);
// true
wu.every([true, false, true]);
// false
wu.every([1,2,3,4,5], x => x < 100);
// true
{% endhighlight %}
