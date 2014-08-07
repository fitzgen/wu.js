---
title: zipLongest
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.zipLongest(...iterables)`

The same as [`wu.zip`](#zip), but keeps going until the longest iterable is
exhausted. When shorter iterables have been exhausted, `undefined` is used in
place of their next items.

{% highlight js %}
wu.zipLongest("hello", [3, 2, 1]);
// (["h", 3], ["e", 2], ["l", 1], ["l", undefined], ["o", undefined])
{% endhighlight %}
