(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    const oldWu = root.wu;
    root.wu = factory();
    root.wu.noConflict = () => {
      const wu = root.wu;
      root.wu = oldWu;
      return wu;
    };
  }
}(this, function () {
  "use strict";


  function* wu(thing) {
    yield* thing;
  }



  /*
   * Internal utilities
   */

  // Return a new function that is the complement of the given function.
  const not = fn => (...args) => !fn(...args);

  // This is known as @@iterator in the ES6 spec.
  const iteratorSymbol = (() => {
    // Check if `Symbol.iterator` exists and use that if possible.
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      return Symbol.iterator;
    }
    // Fall back to using a Proxy to get @@iterator.
    try {
      for (let _ of new Proxy({ get: (_, name) => { throw name; } }))
        break;
    } catch (name) {
      return name;
    }
    throw new Error("Cannot find iterator symbol.");
  }());

  // Get the iterator for the thing or throw an error.
  const getIterator = (thing) => {
    if (thing && thing[iteratorSymbol]) {
      return thing[iteratorSymbol]();
    }
    throw new TypeError("Not iterable: " + thing);
  };

  const GeneratorFunction = function* () {}.constructor;

  // Define a static method on `wu` and set its prototype to the shared
  // `wu.prototype`.
  const staticMethod = (name, fn) => {
    if (fn instanceof GeneratorFunction) {
      fn.prototype = wu.prototype;
    }
    wu[name] = fn;
  };

  // Define a function that is attached as both a `wu.prototype` method and a
  // static method on `wu` directly that takes an iterable as its first
  // parameter.
  const prototypeAndStatic = (name, fn) => {
    if (fn instanceof GeneratorFunction) {
      fn.prototype = wu.prototype;
    }
    wu.prototype[name] = fn;
    wu[name] = (iterable, ...args) => {
      return wu(iterable)[name](...args);
    };
  };


  /*
   * Exposed utilities
   */

  staticMethod("keys", function* (obj) {
    yield* Object.keys(obj);
  });

  staticMethod("values", function* (obj) {
    for (let k of Object.keys(obj)) {
      yield obj[k];
    }
  });

  staticMethod("entries", function* (obj) {
    for (let k of Object.keys(obj)) {
      yield [k, obj[k]];
    }
  });


  /*
   * Infinite iterators
   */

  prototypeAndStatic("cycle", function* () {
    const saved = [];
    for (let x of this) {
      yield x;
      saved.push(x);
    }
    while (saved) {
      yield *saved;
    }
  });

  staticMethod("count", function* (start=0, step=1) {
    let n = start;
    while (true) {
      yield n;
      n += step;
    }
  });

  staticMethod("repeat", function* (thing, times=Infinity) {
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

  staticMethod("chain", function* (...iterables) {
    for (let it of iterables) {
      yield* it;
    }
  });

  prototypeAndStatic("chunk", function* (n=2) {
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
  });

  prototypeAndStatic("compress", function* (selectors) {
    for (let [x, s] of wu.zip(this, selectors)) {
      if (s) {
        yield x;
      }
    }
  });

  prototypeAndStatic("dropWhile", function* (fn=Boolean) {
    for (let x of this) {
      if (fn(x)) {
        continue;
      }
      yield x;
      break;
    }
    yield* this;
  });

  prototypeAndStatic("enumerate", function () {
    return wu.zip(this, wu.count());
  });

  prototypeAndStatic("filter", function* (fn=Boolean) {
    for (let x of this) {
      if (fn(x)) {
        yield x;
      }
    }
  });

  prototypeAndStatic("flatten", function* (shallow=false) {
    TODO;
  });

  prototypeAndStatic("invoke", function* (name, ...args) {
    for (let x of this) {
      yield x[name](...args);
    }
  });

  prototypeAndStatic("map", function* (fn) {
    for (let x of this) {
      yield fn(x);
    }
  });

  prototypeAndStatic("pluck", function* (name) {
    for (let x of this) {
      yield x[name];
    }
  });

  prototypeAndStatic("reject", function* (fn=Boolean) {
    return this.filter(not(fn));
  });

  prototypeAndStatic("slice", function* (start=0, stop=Infinity) {
    for (let [x, i] of this.enumerate()) {
      if (i < start) {
        continue;
      }

      yield x;

      if (i >= stop) {
        break;
      }
    }
  });

  prototypeAndStatic("spreadMap", function* (fn) {
    for (let x of this) {
      yield fn(...x);
    }
  });

  prototypeAndStatic("takeWhile", function* (fn=Boolean) {
    for (let x of this) {
      if (!fn(x)) {
        break;
      }
      yield x;
    }
  });

  prototypeAndStatic("tap", function (fn=console.log) {
    TODO;
  });

  prototypeAndStatic("unique", function* () {
    const seen = new Set();
    for (let x of this) {
      if (!seen.has(x)) {
        yield x;
        seen.add(x);
      }
    }
    seen.clear();
  });

  staticMethod("zip", function (...iterables) {
    let iters = iterables.map(getIterator);
    let anyDone = false;

    while (!anyDone) {
      let zipped = [];
      for (let it of iters) {
        let { value, done } = it.next();
        zipped.push(value);
        if (done) {
          anyDone = true;
        }
      }
      yield zipped;

      if (anyDone) {
        break;
      }
    }
  });

  staticMethod("zipLongest", function (...iterables) {
    TODO;
  });

  staticMethod("zipWith", function (fn, ...args) {
    return wu.zip(...args).spreadMap(fn);
  });


  /*
   * Functions that force iteration to completion and return a value.
   */

  // The maximum number of milliseconds we will block the main thread at a time
  // while in `asyncEach`.
  wu.MAX_BLOCKING = 15;
  // The number of milliseconds to yield to the main thread between bursts or
  // work.
  wu.TIMEOUT = 0;

  prototypeAndStatic("asyncEach", function (fn, maxBlock=wu.MAX_BLOCKING, timeout=wu.TIMEOUT) {
    const iterable = this[iteratorSymbol]();

    return new Promise((resolve, reject) => {
      (function loop() {
        const start = Date.now();

        for (let x of iterable) {
          if (Date.now() - start > maxBlock) {
            setTimeout(loop, timeout);
            return;
          }

          try {
            fn(x);
          } catch (e) {
            reject(e);
            return;
          }
        }

        resolve();
      }());
    });
  });

  prototypeAndStatic("every", function (fn=Boolean) {
    return !this.some(not(fn));
  });

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
  });

  // TODO wtf is irakli's name for the yielding iterative reduce

  prototypeAndStatic("some", function (fn=Boolean) {
    for (let x of this) {
      if (fn(x)) {
        return true;
      }
    }
    return false;
  });


  /*
   * Methods that return an array of iterables.
   */

  prototypeAndStatic("tee", function (n=2) {
    TODO;
  });

  staticMethod("unzip", function (...iterables) {
    TODO;
  });


  /*
   * Combinatoric methods
   */

  prototypeAndStatic("combos", function* () {
    TODO;
  });

  prototypeAndStatic("combosWithReplacement", function* () {
    TODO;
  });

  prototypeAndStatic("permutations", function* () {
    TODO;
  });

  const _product = function* (chained, iterable) {
    for (let tuple of chained) {
      for (let item of iterable) {
        yield tuple.concat(item);
      }
    }
  };

  prototypeAndStatic("product", function* (...iterables) {
    return iterables.reduce(_product, getIterator([[]]));
  });


  /*
   * Number of chambers.
   */

  wu.tang = { clan: 36 };

  return wu;


}));
