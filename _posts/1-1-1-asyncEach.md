---
title: asyncEach
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).asyncEach(fn, maxBlock=wu.MAX_BLOCK, timeout=wu.TIMEOUT)`

##### `wu.asyncEach(fn, maxBlock, timeout, iterable)` *[curryable](#curryable)*

Call `fn(item)` for each item in the (possibly infinite) iterable. Every
`maxBlock` milliseconds, do a `setTimeout` for `timeout` milliseconds so that we
don't hog the thread to ourselves. This gives the browser a chance to paint,
fire an event handler, or run another concurrent `asyncEach`'s set of calls.

`asyncEach` returns a `Promise` that is resolved when iteration has completed.

Note: It is generally preferrable to use a `Worker` instead of `asyncEach` when
possible, as this will give you better throughput and responsiveness. However,
if you absolutely must do iteration over a very large number of items on the
main thread, `asyncEach` will let you do it without getting a slow-script-dialog
for the tab.

{% highlight js %}
wu.count().asyncEach(x => console.log(x));
// console.log: 0
// console.log: 1
// console.log: 2
// console.log: 3
// ...
{% endhighlight %}

