---
title: filter
---
#### `wu.filter`

{% highlight js %}
wu([false, true, false, true]).filter()
// (true, true)
wu([1, 2, 3, 4]).filter(x => x % 2 === 0)
// (2, 4)
{% endhighlight %}
