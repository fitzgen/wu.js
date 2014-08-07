---
title: repeat
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.repeat(thing, n=Inifinity)`

Create an iterable that yields `thing` `n` times.

{% highlight js %}
wu.repeat(42)
// (42, 42, 42, 42, 42, ...)
wu.repeat("hello", 2)
// ("hello", "hello")
{% endhighlight %}
