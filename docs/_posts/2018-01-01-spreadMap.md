---
title: spreadMap
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).spreadMap(fn)`

##### `wu.spreadMap(fn, iterable)` *[curryable](#curryable)*

For each item in the iterable, yield `fn(...item)`.

{% highlight js %}
const pairs = [
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4]
];
wu(pairs).spreadMap(Math.pow);
// (2, 4, 8, 16)
{% endhighlight %}
