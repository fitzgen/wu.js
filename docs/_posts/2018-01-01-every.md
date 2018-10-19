---
title: every
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).every(fn=Boolean)`

##### `wu.every(fn, iterable)` *[curryable](#curryable)*

Return `true` if `fn(item)` is truthy for every item in the iterable, otherwise
return `false`.

{% highlight js %}
wu([true, 36, "chambers"]).every();
// true

wu([true, false, true]).every();
// false

const allLessThan100 = wu.every(x => x < 100);
allLessThan100([1, 2, 3, 4, 5]);
// true
{% endhighlight %}
