---
title: pluck
---
#### [{{ page.title }}](#{{ page.title | slugify }})

##### `wu(iterable).pluck(propertyName)`

##### `wu.pluck(propertyName, iterable)` *[curryable](#curryable)*

For each item in the iterable, yield `item[propertyName]`.

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
wu(myTeam).pluck("alias");
// ("RZA", "GZA", "Method Man", ...)
{% endhighlight %}
