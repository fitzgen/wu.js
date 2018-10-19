---
title: unique
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).unique()`

##### `wu.unique(iterable)` *[curryable](#curryable)*

For each item in the iterable, yield only the first occurence of the item.

Note that all yielded items from the iterable are kept in a `Set`, so memory
overhead may become significant while iterating over large collections.

{% highlight js %}
wu([1, 2, 1, 1, 3, 2, 3]).unique();
// (1, 2, 3)
{% endhighlight %}
