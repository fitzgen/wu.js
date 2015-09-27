"use strict";

const wu = module.exports = function wu(iterable) {
  if (!isIterable(iterable)) {
    throw new Error("wu: `" + iterable + "` is not iterable!");
  }
  return new Wu(iterable);
}

function Wu(iterable) {
  const iterator = getIterator(iterable);
  this.next = iterator.next.bind(iterator);
}
wu.prototype = Wu.prototype;

wu.prototype[Symbol.iterator] = function () { return this; };


/*
 * Internal utilities
 */

// An internal placeholder value.
const MISSING = {};

// Return whether a thing is iterable.
const isIterable = thing => {
  return thing && typeof thing[Symbol.iterator] === "function";
};

// Get the iterator for the thing or throw an error.
const getIterator = thing => {
  if (isIterable(thing)) {
    return thing[Symbol.iterator]();
  }
  throw new TypeError("Not iterable: " + thing);
};

// Define a static method on `wu` and set its prototype to the shared
// `Wu.prototype`.
const staticMethod = (name, fn) => {
  fn.prototype = Wu.prototype;
  wu[name] = fn;
};

// Define a function that is attached as both a `Wu.prototype` method and a
// curryable static method on `wu` directly that takes an iterable as its last
// parameter.
const prototypeAndStatic = (name, fn, expectedArgs=fn.length) => {
  fn.prototype = Wu.prototype;
  Wu.prototype[name] = fn;

  // +1 for the iterable, which is the `this` value of the function so it
  // isn't reflected by the length property.
  expectedArgs += 1;

  wu[name] = wu.curryable((...args) => {
    const iterable = args.pop();
    return wu(iterable)[name](...args);
  }, expectedArgs);
};

// A decorator for rewrapping a method's returned iterable in wu to maintain
// chainability.
const rewrap = fn => function (...args) {
  return wu(fn.call(this, ...args));
};

const rewrapStaticMethod = (name, fn) => staticMethod(name, rewrap(fn));
const rewrapPrototypeAndStatic = (name, fn, expectedArgs) =>
      prototypeAndStatic(name, rewrap(fn), expectedArgs);

// Return a wrapped version of `fn` bound with the initial arguments
// `...args`.
function curry(fn, args) {
  return function (...moreArgs) {
    return fn.call(this, ...args, ...moreArgs);
  };
}


/*
 * Public utilities
 */

staticMethod("curryable", (fn, expected=fn.length) => function f(...args) {
  return args.length >= expected
    ? fn.apply(this, args)
    : curry(f, args);
});

rewrapStaticMethod("entries", function* (obj) {
  for (let k of Object.keys(obj)) {
    yield [k, obj[k]];
  }
});

rewrapStaticMethod("keys", function* (obj) {
  yield* Object.keys(obj);
});

rewrapStaticMethod("values", function* (obj) {
  for (let k of Object.keys(obj)) {
    yield obj[k];
  }
});


/*
 * Infinite iterators
 */

rewrapPrototypeAndStatic("cycle", function* () {
  const saved = [];
  for (let x of this) {
    yield x;
    saved.push(x);
  }
  while (saved) {
    yield *saved;
  }
});

rewrapStaticMethod("count", function* (start=0, step=1) {
  let n = start;
  while (true) {
    yield n;
    n += step;
  }
});

rewrapStaticMethod("repeat", function* (thing, times=Infinity) {
  if (times === Infinity) {
    while (true) {
      yield thing;
    }
  } else {
    for (let i = 0; i < times; i++) {
      yield thing;
    }
  }
});


/*
 * Iterators that terminate once the input sequence has been exhausted
 */

rewrapStaticMethod("chain", function* (...iterables) {
  for (let it of iterables) {
    yield* it;
  }
});

rewrapPrototypeAndStatic("chunk", function* (n=2) {
  let items = [];
  let index = 0;

  for (let item of this) {
    items[index++] = item;
    if (index === n) {
      yield items;
      items = [];
      index = 0;
    }
  }

  if (index) {
    yield items;
  }
}, 1);

rewrapPrototypeAndStatic("concatMap", function *(fn) {
  for (let x of this) {
    yield* fn(x);
  }
});

rewrapPrototypeAndStatic("drop", function* (n) {
  let i = 0;
  for (let x of this) {
    if (i++ < n) {
      continue;
    }
    yield x;
    break;
  }
  yield* this;
});

rewrapPrototypeAndStatic("dropWhile", function* (fn=Boolean) {
  for (let x of this) {
    if (fn(x)) {
      continue;
    }
    yield x;
    break;
  }
  yield* this;
}, 1);

rewrapPrototypeAndStatic("enumerate", function* () {
  yield* _zip([this, wu.count()]);
});

rewrapPrototypeAndStatic("filter", function* (fn=Boolean) {
  for (let x of this) {
    if (fn(x)) {
      yield x;
    }
  }
}, 1);

rewrapPrototypeAndStatic("flatten", function* (shallow=false) {
  for (let x of this) {
    if (typeof x !== "string" && isIterable(x)) {
      yield* (shallow ? x : wu(x).flatten());
    } else {
      yield x;
    }
  }
}, 1);

rewrapPrototypeAndStatic("invoke", function* (name, ...args) {
  for (let x of this) {
    yield x[name](...args);
  }
});

rewrapPrototypeAndStatic("map", function* (fn) {
  for (let x of this) {
    yield fn(x);
  }
});

rewrapPrototypeAndStatic("pluck", function* (name) {
  for (let x of this) {
    yield x[name];
  }
});

rewrapPrototypeAndStatic("reductions", function* (fn, initial=undefined) {
  let val = initial;
  if (val === undefined) {
    for (let x of this) {
      val = x;
      break;
    }
  }

  yield val;
  for (let x of this) {
    yield (val = fn(val, x));
  }

  return val;
}, 2);

rewrapPrototypeAndStatic("reject", function* (fn=Boolean) {
  for (let x of this) {
    if (!fn(x)) {
      yield x;
    }
  }
}, 1);

rewrapPrototypeAndStatic("slice", function* (start=0, stop=Infinity) {
  if (stop < start) {
    throw new RangeError("parameter `stop` (= " + stop
                         + ") must be >= `start` (= " + start + ")");
  }

  for (let [x, i] of this.enumerate()) {
    if (i < start) {
      continue;
    }
    if (i >= stop) {
      break;
    }
    yield x;
  }
}, 2);

rewrapPrototypeAndStatic("spreadMap", function* (fn) {
  for (let x of this) {
    yield fn(...x);
  }
});

rewrapPrototypeAndStatic("take", function* (n) {
  if (n < 1) {
    return;
  }
  let i = 0;
  for (let x of this) {
    yield x;
    if (++i >= n) {
      break;
    }
  }
});

rewrapPrototypeAndStatic("takeWhile", function* (fn=Boolean) {
  for (let x of this) {
    if (!fn(x)) {
      break;
    }
    yield x;
  }
}, 1);

rewrapPrototypeAndStatic("tap", function* (fn=console.log.bind(console)) {
  for (let x of this) {
    fn(x);
    yield x;
  }
}, 1);

rewrapPrototypeAndStatic("unique", function* () {
  const seen = new Set();
  for (let x of this) {
    if (!seen.has(x)) {
      yield x;
      seen.add(x);
    }
  }
  seen.clear();
});


const _zip = rewrap(function* (iterables, longest=false) {
  if (!iterables.length) {
    return;
  }

  const iters = iterables.map(getIterator);
  const numIters = iterables.length;
  let numFinished = 0;
  let finished = false;

  while (!finished) {
    let zipped = [];

    for (let it of iters) {
      let { value, done } = it.next();
      if (done) {
        if (!longest) {
          return;
        }
        if (++numFinished == numIters) {
          finished = true;
        }
      }
      if (value === undefined) {
        // Leave a hole in the array so that you can distinguish an iterable
        // that's done (via `index in array == false`) from an iterable
        // yielding `undefined`.
        zipped.length++;
      } else {
        zipped.push(value);
      }
    }
    yield zipped;
  }
});

rewrapStaticMethod("zip", function* (...iterables) {
  yield* _zip(iterables);
});

rewrapStaticMethod("zipLongest", function* (...iterables) {
  yield* _zip(iterables, true);
});

rewrapStaticMethod("zipWith", function* (fn, ...iterables) {
  yield* _zip(iterables).spreadMap(fn);
});


/*
 * Functions that force iteration to completion and return a value.
 */

// The maximum number of milliseconds we will block the main thread at a time
// while in `asyncEach`.
wu.MAX_BLOCK = 15;
// The number of milliseconds to yield to the main thread between bursts of
// work.
wu.TIMEOUT = 1;

prototypeAndStatic("asyncEach", function (fn, maxBlock=wu.MAX_BLOCK, timeout=wu.TIMEOUT) {
  const iter = getIterator(this);

  return new Promise((resolve, reject) => {
    (function loop() {
      const start = Date.now();

      for (let x of iter) {
        try {
          fn(x);
        } catch (e) {
          reject(e);
          return;
        }

        if (Date.now() - start > maxBlock) {
          setTimeout(loop, timeout);
          return;
        }
      }

      resolve();
    }());
  });
}, 3);

prototypeAndStatic("every", function (fn=Boolean) {
  for (let x of this) {
    if (!fn(x)) {
      return false;
    }
  }
  return true;
}, 1);

prototypeAndStatic("find", function (fn) {
  for (let x of this) {
    if (fn(x)) {
      return x;
    }
  }
});

prototypeAndStatic("forEach", function (fn) {
  for (let x of this) {
    fn(x);
  }
});

prototypeAndStatic("has", function (thing) {
  return this.some(x => x === thing);
});

prototypeAndStatic("reduce", function (fn, initial=undefined) {
  let val = initial;
  if (val === undefined) {
    for (let x of this) {
      val = x;
      break;
    }
  }

  for (let x of this) {
    val = fn(val, x);
  }

  return val;
}, 2);

prototypeAndStatic("some", function (fn=Boolean) {
  for (let x of this) {
    if (fn(x)) {
      return true;
    }
  }
  return false;
}, 1);

prototypeAndStatic("toArray", function () {
  return [...this];
});

/*
 * Methods that return an array of iterables.
 */

const MAX_CACHE = 500;

const _tee = rewrap(function* (iterator, cache) {
  let { items } = cache;
  let index = 0;

  while (true) {
    // We don't have a cached item for this index, we need to force its
    // evaluation.
    if (index === items.length) {
      let {done, value} = iterator.next();
      if (done) {
        if (cache.returned === MISSING) {
          cache.returned = value;
        }
        break;
      }
      yield items[index++] = value;
    }

    // If we are the last iterator to use a cached value, clean up after
    // ourselves.
    else if (index === cache.tail) {
      let value = items[index];
      if (index === MAX_CACHE) {
        items = cache.items = items.slice(index);
        index = 0;
        cache.tail = 0;
      } else {
        items[index] = undefined;
        cache.tail = ++index;
      }
      yield value;
    }

    // We have an item in the cache for this index, so yield it.
    else {
      yield items[index++];
    }
  }

  if (cache.tail === index) {
    items.length = 0;
  }

  return cache.returned;
});
_tee.prototype = Wu.prototype;

prototypeAndStatic("tee", function (n=2) {
  const iterables = new Array(n);
  const cache = { tail: 0, items: [], returned: MISSING };

  while (n--) {
    iterables[n] = _tee(this, cache);
  }

  return iterables;
}, 1);

prototypeAndStatic("unzip", function (n=2) {
  return this.tee(n).map((iter, i) => iter.pluck(i));
}, 1);


/*
 * Number of chambers.
 */

wu.tang = { clan: 36 };
