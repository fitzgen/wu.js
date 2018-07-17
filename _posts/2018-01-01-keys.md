---
title: keys
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.keys(object)`

Yield the property name of each enumerable property on the object.

{% highlight js %}
const obj = { uno: 1, dos: 2, tres: 3 };
wu.keys(obj);
// ("uno", "dos", "tres")
{% endhighlight %}
