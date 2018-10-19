---
title: find
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).find(fn)`

##### `wu.find(fn, iterable)` *[curryable](#curryable)*

Return the first item from the iterable for which `fn(item)` is truthy. If no
item is found, `undefined` is returned.

{% highlight js %}
const myTeam = [
  { name: "Robert Fitzgerald Diggs", alias: "RZA"              },
  { name: "Gary Grice",              alias: "GZA"              },
  { name: "Clifford Smith",          alias: "Method Man"       },
  { name: "Corey Woods",             alias: "Raekwon"          },
  { name: "Dennis Coles",            alias: "Ghostface Killah" },
  { name: "Jason Hunter",            alias: "Inspectah Deck"   },
  { name: "Lamont Jody Hawkins",     alias: "U-God"            },
  { name: "Elgin Turner",            alias: "Masta Killah"     },
  { name: "Russell Tyrone Jones",    alias: "ODB"              }
];
wu(myTeam).find(({ name }) => name.contains("Fitzgerald"));
// { name: "Robert Fitzgerald Diggs", alias: "RZA" }
{% endhighlight %}
