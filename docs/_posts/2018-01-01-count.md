---
title: count
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.count(start=0, step=1)`

Yield an infinite set of numbers starting with `start` and incrementing by
`step`.

{% highlight js %}
wu.count()
// (0, 1, 2, 3, 4, 5, 6, ...)
wu.count(5)
// (5, 6, 7, 8, 9, 10, ...)
wu.count(0, 5)
// (0, 5, 10, 15, 20, 25, ...)
{% endhighlight %}
