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

  // An internal placeholder value.
  const MISSING = {};

  // This is known as @@iterator in the ES6 spec.
  Object.defineProperty(wu, "iteratorSymbol", {
    configurable: false,
    writable: false,
    value: (function () {
      // Check if `Symbol.iterator` exists and use that if possible.
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        return Symbol.iterator;
      }
      // Fall back to using a Proxy to get @@iterator.
      try {
        for (let _ of new Proxy({}, { get: (_, name) => { throw name; } }))
          break;
      } catch (name) {
        return name;
      }
      throw new Error("Cannot find iterator symbol.");
    }())
  });

  // Return whether a thing is iterable.
  const isIterable = (thing) => {
    return thing && typeof thing[wu.iteratorSymbol] === "function";
  };

  // Get the iterator for the thing or throw an error.
  const getIterator = (thing) => {
    if (isIterable(thing)) {
      return thing[wu.iteratorSymbol]();
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
   * Public utilities
   */

  staticMethod("entries", function* (obj) {
    for (let k of Object.keys(obj)) {
      yield [k, obj[k]];
    }
  });

  staticMethod("keys", function* (obj) {
    yield* Object.keys(obj);
  });

  staticMethod("values", function* (obj) {
    for (let k of Object.keys(obj)) {
      yield obj[k];
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

  prototypeAndStatic("concatMap", function *(fn) {
    for (let x of this) {
      yield* fn(x);
    }
  });

  prototypeAndStatic("drop", function* (n) {
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
    return _zip([this, wu.count()]);
  });

  prototypeAndStatic("filter", function* (fn=Boolean) {
    for (let x of this) {
      if (fn(x)) {
        yield x;
      }
    }
  });

  prototypeAndStatic("flatten", function* (shallow=false) {
    for (let x of this) {
      if (typeof x !== "string" && isIterable(x)) {
        yield* shallow ? x : wu.flatten(x);
      } else {
        yield x;
      }
    }
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

  prototypeAndStatic("reductions", function* (fn, initial=undefined) {
    let val = initial;
    if (val === undefined) {
      for (let x of this) {
        val = x;
        break;
      }
    }
    yield val;
    for (let x of this) {
      yield val = fn(val, x);
    }
    return val;
  });

  prototypeAndStatic("reject", function* (fn=Boolean) {
    for (let x of this) {
      if (!fn(x)) {
        yield x;
      }
    }
  });

  prototypeAndStatic("slice", function* (start=0, stop=Infinity) {
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
  });

  prototypeAndStatic("spreadMap", function* (fn) {
    for (let x of this) {
      yield fn(...x);
    }
  });

  prototypeAndStatic("take", function* (n) {
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

  prototypeAndStatic("takeWhile", function* (fn=Boolean) {
    for (let x of this) {
      if (!fn(x)) {
        break;
      }
      yield x;
    }
  });

  prototypeAndStatic("tap", function* (fn=console.log.bind(console)) {
    for (let x of this) {
      fn(x);
      yield x;
    }
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


  const _zip = function* (iterables, longest=false) {
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
  };
  _zip.prototype = wu.prototype;

  staticMethod("zip", function (...iterables) {
    return _zip(iterables);
  });

  staticMethod("zipLongest", function (...iterables) {
    return _zip(iterables, true);
  });

  staticMethod("zipWith", function (fn, ...iterables) {
    return _zip(iterables).spreadMap(fn);
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
    const iter = this[wu.iteratorSymbol]();

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
  });

  prototypeAndStatic("every", function (fn=Boolean) {
    for (let x of this) {
      if (!fn(x)) {
        return false;
      }
    }
    return true;
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

  const _tee = function* (iterator, cache) {
    let { items } = cache;
    let index = 0;

    while (true) {
      if (index === items.length) {
        let {done, value} = iterator.next();
        if (done) {
          if (cache.returned === MISSING) {
            cache.returned = value;
          }
          break;
        }
        yield items[index++] = value;
      } else if (index === cache.tail) {
        let value = items[index];
        if (index === 500) {
          items = cache.items = items.slice(index);
          index = 0;
          cache.tail = 0;
        } else {
          items[index] = undefined;
          cache.tail = ++index;
        }
        yield value;
      } else {
        yield items[index++];
      }
    }

    if (cache.tail === index) {
      items.length = 0;
    }

    return cache.returned;
  };
  _tee.prototype = wu.prototype;

  prototypeAndStatic("tee", function (n=2) {
    const iterables = new Array(n);
    const cache = { tail: 0, items: [], returned: MISSING };

    while (n--) {
      iterables[n] = _tee(this, cache);
    }

    return iterables;
  });

  // An efficient implementation of the queue data structure using an array.
  function Queue(iterable) {
    this._head = 0;
    this._items = iterable ? [...iterable] : [];
    this.size = this._items.length;
  }

  Queue.COMPACT_SIZE = 500;

  Queue.prototype.enqueue = function(item) {
    this._items.push(item);
    return ++this.size;
  };

  Queue.prototype.dequeue = function() {
    if (this.size) {
      const item = this._items[this._head];
      if (this._head === Queue.COMPACT_SIZE) {
        this._items = this._items.slice(this._head + 1);
        this._head = 0;
      } else {
        this._items[this._head++] = MISSING;
      }
      return item;
    }
  };

  const _unzip = function*(iterator, index, queues) {
    const queue = queues[index];
    while (true) {
      if (queue.size) {
        yield queue.dequeue();
      } else {
        const {value, done} = iterator.next();
        if (done) {
          return;
        }

        let item = MISSING;
        for (let i = 0; i < queues.length; i++) {
          if (i in value) {
            if (index === i) {
              item = value[i];
            } else {
              queues[i].enqueue(value[i]);
            }
          }
        }

        if (item !== MISSING) {
          yield item;
        }
      }
    }
  }
  _unzip.prototype = wu.prototype;

  prototypeAndStatic("unzip", function () {
    const { value, done } = this.next();
    if (done) {
      return [];
    }
    let count = value.length;
    const iterables = new Array(count);
    const queues = new Array(count);

    while (count--) {
      queues[count] = new Queue();
      queues[count].enqueue(value[count]);
      iterables[count] = _unzip(this, count, queues);
    }

    return iterables;
  });


  /*
   * Number of chambers.
   */

  wu.tang = { clan: 36 };

  return wu;


}));
