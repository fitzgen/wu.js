---
title: join
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).join([separator=","])`

##### `wu.join(separrator, iterable)` *[currable](#curryable)*


Joins all elements of the iterable into a string, separated by the `separator`.

{% highlight js %}
wu([1,2,3]).join();
// "1,2,3"

wu.join('|', [1,2,3]);
// "1|2|3"
{% endhighlight %}
