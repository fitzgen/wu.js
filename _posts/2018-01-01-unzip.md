---
title: unzip
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).unzip(n=2)`

##### `wu.unzip(n, iterable)` *[curryable](#curryable)*

Given an iterable whose items are of the form `[a, b, c, ...]`, return an array
of iterators of the form `[as, bs, cs, ...]`.

{% highlight js %}
const pairs = [
  ["one", 1],
  ["two", 2],
  ["three", 3]
];

const [i1, i2] = wu(pairs).unzip();

i1;
("one", "two", "three")

i2;
(1, 2, 3)
{% endhighlight %}
