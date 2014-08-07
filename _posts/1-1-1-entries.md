---
title: entries
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.entries(object)`

Yield `[key, value]` pairs from the given object. Ordering of the pairs is
undefined and cannot be relied upon.

{% highlight js %}
const obj = { foo: 1, bar: 2, baz: 3 };
wu.entries(obj);
// (["foo", 1], ["bar", 2], ["baz", 3])
{% endhighlight %}
