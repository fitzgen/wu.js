---
title: chain
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu.chain(...iterables)`

Form a single iterator from consequtive iterables. Yields items from the first
iterable until it is exhausted, then yields items from the second iterable until
that one is exhausted, and so on until all elements from all iterables have been
yielded.

{% highlight js %}
wu.chain("ab", "cd", "ef")
// ("a", "b", "c", "d", "e", "f")
{% endhighlight %}
