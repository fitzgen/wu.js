---
title: values
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.values(object)`

Yield the property value of each enumerable property on the object.

{% highlight js %}
const obj = { uno: 1, dos: 2, tres: 3 };
wu.values(obj);
// (1, 2, 3)
{% endhighlight %}
