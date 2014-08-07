---
title: invoke
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).invoke(methodName, ...args)`

##### `wu.invoke(methodName, ...args, iterable)` *[curryable](#curryable)*

For each item in the iterable, yield `item[methodName](...args)`.

{% highlight js %}
wu([0,1,2,3,4]).invoke("toString", 2);
// ("0", "1", "10", "11", "100")

function Animal(type, noise) {
  this.type  = type;
  this.noise = noise;
}

Animal.prototype.makeNoise = function () {
  return this.type " says '" + this.noise + "'";
}

const animals = [
  new Animal("cat", "meow"),
  new Animal("dog", "woof"),
  new Animal("rat", "squeek"),
  new Animal("hog", "oink")
];

wu(animals).invoke("makeNoise");
// ("cat says 'meow'",
//  "dog says 'woof'",
//  "rat says 'squeek'",
//  "hog says 'oink'")
{% endhighlight %}
