var $__wu__ = (function() {
  "use strict";
  var __moduleName = "wu";
  (function(root, factory) {
    if (typeof define === "function" && define.amd) {
      define(factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) === "object") {
      module.exports = factory();
    } else {
      try {
        throw undefined;
      } catch (oldWu) {
        oldWu = root.wu;
        root.wu = factory();
        root.wu.noConflict = (function() {
          var wu = root.wu;
          root.wu = oldWu;
          return wu;
        });
      }
    }
  }(this, function() {
    "use strict";
    var $__11 = $traceurRuntime.initGeneratorFunction(wu);
    function wu(thing) {
      var $__12,
          $__13;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__12 = thing[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__13 = $__12[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__13.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__13.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__13.value;
            default:
              return $ctx.end();
          }
      }, $__11, this);
    }
    var MISSING = {};
    Object.defineProperty(wu, "iteratorSymbol", {
      configurable: false,
      writable: false,
      value: (function() {
        if (typeof Symbol === "function" && $traceurRuntime.typeof(Symbol.iterator) === "symbol") {
          return Symbol.iterator;
        }
        try {
          for (var $__0 = new Proxy({}, {get: (function(_, name) {
              throw name;
            })})[$traceurRuntime.toProperty(Symbol.iterator)](),
              $__1; !($__1 = $__0.next()).done; ) {
            try {
              throw undefined;
            } catch (_) {
              _ = $__1.value;
              break;
            }
          }
        } catch (name) {
          return name;
        }
        throw new Error("Cannot find iterator symbol.");
      }())
    });
    var isIterable = (function(thing) {
      return thing && typeof thing[$traceurRuntime.toProperty(wu.iteratorSymbol)] === "function";
    });
    var getIterator = (function(thing) {
      if (isIterable(thing)) {
        return thing[$traceurRuntime.toProperty(wu.iteratorSymbol)]();
      }
      throw new TypeError("Not iterable: " + thing);
    });
    var GeneratorFunction = $traceurRuntime.initGeneratorFunction(function $__14() {
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__14, this);
    }).constructor;
    var staticMethod = (function(name, fn) {
      if (fn instanceof GeneratorFunction) {
        fn.prototype = wu.prototype;
      }
      $traceurRuntime.setProperty(wu, name, fn);
    });
    var prototypeAndStatic = (function(name, fn) {
      if (fn instanceof GeneratorFunction) {
        fn.prototype = wu.prototype;
      }
      $traceurRuntime.setProperty(wu.prototype, name, fn);
      $traceurRuntime.setProperty(wu, name, (function(iterable) {
        var $__10;
        for (var args = [],
            $__4 = 1; $__4 < arguments.length; $__4++)
          $traceurRuntime.setProperty(args, $__4 - 1, arguments[$traceurRuntime.toProperty($__4)]);
        return ($__10 = wu(iterable))[$traceurRuntime.toProperty(name)].apply($__10, $traceurRuntime.toObject(args));
      }));
    });
    staticMethod("entries", $traceurRuntime.initGeneratorFunction(function $__15(obj) {
      var $__0,
          $__1,
          k;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__0 = Object.keys(obj)[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = (!($__1 = $__0.next()).done) ? 9 : -2;
              break;
            case 9:
              $ctx.pushTry(7, null);
              $ctx.state = 10;
              break;
            case 10:
              throw undefined;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.popTry();
              $ctx.state = 14;
              break;
            case 7:
              $ctx.popTry();
              k = $ctx.storedException;
              $ctx.state = 5;
              break;
            case 5:
              k = $__1.value;
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return [k, obj[$traceurRuntime.toProperty(k)]];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 14;
              break;
            default:
              return $ctx.end();
          }
      }, $__15, this);
    }));
    staticMethod("keys", $traceurRuntime.initGeneratorFunction(function $__16(obj) {
      var $__17,
          $__18;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__17 = Object.keys(obj)[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__18 = $__17[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__18.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__18.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__18.value;
            default:
              return $ctx.end();
          }
      }, $__16, this);
    }));
    staticMethod("values", $traceurRuntime.initGeneratorFunction(function $__19(obj) {
      var $__0,
          $__1,
          k;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__0 = Object.keys(obj)[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = (!($__1 = $__0.next()).done) ? 9 : -2;
              break;
            case 9:
              $ctx.pushTry(7, null);
              $ctx.state = 10;
              break;
            case 10:
              throw undefined;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.popTry();
              $ctx.state = 14;
              break;
            case 7:
              $ctx.popTry();
              k = $ctx.storedException;
              $ctx.state = 5;
              break;
            case 5:
              k = $__1.value;
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return obj[$traceurRuntime.toProperty(k)];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 14;
              break;
            default:
              return $ctx.end();
          }
      }, $__19, this);
    }));
    prototypeAndStatic("cycle", $traceurRuntime.initGeneratorFunction(function $__20() {
      var saved,
          $__0,
          $__1,
          x,
          $__21,
          $__22;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              saved = [];
              $ctx.state = 34;
              break;
            case 34:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 16;
              break;
            case 16:
              $ctx.state = (!($__1 = $__0.next()).done) ? 11 : 18;
              break;
            case 11:
              $ctx.pushTry(9, null);
              $ctx.state = 12;
              break;
            case 12:
              throw undefined;
              $ctx.state = 14;
              break;
            case 14:
              $ctx.popTry();
              $ctx.state = 16;
              break;
            case 9:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 7;
              break;
            case 7:
              x = $__1.value;
              $ctx.state = 8;
              break;
            case 8:
              $ctx.state = 2;
              return x;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              saved.push(x);
              $ctx.state = 16;
              break;
            case 18:
              $ctx.state = (saved) ? 30 : -2;
              break;
            case 30:
              $__21 = saved[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 31;
              break;
            case 31:
              $__22 = $__21[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 28;
              break;
            case 28:
              $ctx.state = ($__22.done) ? 22 : 21;
              break;
            case 22:
              $ctx.sent = $__22.value;
              $ctx.state = 18;
              break;
            case 21:
              $ctx.state = 31;
              return $__22.value;
            default:
              return $ctx.end();
          }
      }, $__20, this);
    }));
    staticMethod("count", $traceurRuntime.initGeneratorFunction(function $__23() {
      var start,
          step,
          n;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              start = $arguments[0] !== (void 0) ? $arguments[0] : 0;
              step = $arguments[1] !== (void 0) ? $arguments[1] : 1;
              n = start;
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (true) ? 1 : -2;
              break;
            case 1:
              $ctx.state = 2;
              return n;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              n += step;
              $ctx.state = 9;
              break;
            default:
              return $ctx.end();
          }
      }, $__23, this);
    }));
    staticMethod("repeat", $traceurRuntime.initGeneratorFunction(function $__24(thing) {
      var times,
          i,
          $i;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              times = $arguments[1] !== (void 0) ? $arguments[1] : Infinity;
              $ctx.state = 44;
              break;
            case 44:
              $ctx.state = (times === Infinity) ? 4 : 35;
              break;
            case 4:
              $ctx.state = (true) ? 1 : -2;
              break;
            case 1:
              $ctx.state = 2;
              return thing;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 35:
              $ctx.pushTry(33, null);
              $ctx.state = 36;
              break;
            case 36:
              throw undefined;
              $ctx.state = 38;
              break;
            case 38:
              $ctx.popTry();
              $ctx.state = -2;
              break;
            case 33:
              $ctx.popTry();
              $i = $ctx.storedException;
              $ctx.state = 31;
              break;
            case 31:
              $i = 0;
              $ctx.state = 32;
              break;
            case 32:
              $ctx.state = ($i < times) ? 22 : -2;
              break;
            case 27:
              $i++;
              $ctx.state = 32;
              break;
            case 22:
              $ctx.pushTry(20, null);
              $ctx.state = 23;
              break;
            case 23:
              throw undefined;
              $ctx.state = 25;
              break;
            case 25:
              $ctx.popTry();
              $ctx.state = 27;
              break;
            case 20:
              $ctx.popTry();
              i = $ctx.storedException;
              $ctx.state = 18;
              break;
            case 18:
              i = $i;
              $ctx.state = 19;
              break;
            case 19:
              $ctx.pushTry(null, 11);
              $ctx.state = 13;
              break;
            case 13:
              $ctx.state = 7;
              return thing;
            case 7:
              $ctx.maybeThrow();
              $ctx.state = 27;
              break;
            case 11:
              $ctx.popTry();
              $ctx.state = 17;
              break;
            case 17:
              $i = i;
              $ctx.state = 15;
              break;
            default:
              return $ctx.end();
          }
      }, $__24, this);
    }));
    staticMethod("chain", $traceurRuntime.initGeneratorFunction(function $__25() {
      var iterables,
          $__4,
          $__0,
          $__1,
          $__26,
          $__27,
          it;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              for (iterables = [], $__4 = 0; $__4 < $arguments.length; $__4++)
                $traceurRuntime.setProperty(iterables, $__4, $arguments[$traceurRuntime.toProperty($__4)]);
              $ctx.state = 27;
              break;
            case 27:
              $__0 = iterables[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 22;
              break;
            case 22:
              $ctx.state = (!($__1 = $__0.next()).done) ? 17 : -2;
              break;
            case 17:
              $ctx.pushTry(15, null);
              $ctx.state = 18;
              break;
            case 18:
              throw undefined;
              $ctx.state = 20;
              break;
            case 20:
              $ctx.popTry();
              $ctx.state = 22;
              break;
            case 15:
              $ctx.popTry();
              it = $ctx.storedException;
              $ctx.state = 13;
              break;
            case 13:
              it = $__1.value;
              $ctx.state = 14;
              break;
            case 14:
              $__26 = it[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__27 = $__26[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__27.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__27.value;
              $ctx.state = 22;
              break;
            case 2:
              $ctx.state = 12;
              return $__27.value;
            default:
              return $ctx.end();
          }
      }, $__25, this);
    }));
    prototypeAndStatic("chunk", $traceurRuntime.initGeneratorFunction(function $__28() {
      var n,
          items,
          index,
          $__0,
          $__1,
          item;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              n = $arguments[0] !== (void 0) ? $arguments[0] : 2;
              items = [];
              index = 0;
              $ctx.state = 29;
              break;
            case 29:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 19;
              break;
            case 19:
              $ctx.state = (!($__1 = $__0.next()).done) ? 14 : 21;
              break;
            case 14:
              $ctx.pushTry(12, null);
              $ctx.state = 15;
              break;
            case 15:
              throw undefined;
              $ctx.state = 17;
              break;
            case 17:
              $ctx.popTry();
              $ctx.state = 19;
              break;
            case 12:
              $ctx.popTry();
              item = $ctx.storedException;
              $ctx.state = 10;
              break;
            case 10:
              item = $__1.value;
              $ctx.state = 11;
              break;
            case 11:
              $traceurRuntime.setProperty(items, index++, item);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (index === n) ? 1 : 19;
              break;
            case 1:
              $ctx.state = 2;
              return items;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              items = [];
              index = 0;
              $ctx.state = 19;
              break;
            case 21:
              $ctx.state = (index) ? 23 : -2;
              break;
            case 23:
              $ctx.state = 24;
              return items;
            case 24:
              $ctx.maybeThrow();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__28, this);
    }));
    prototypeAndStatic("concatMap", $traceurRuntime.initGeneratorFunction(function $__29(fn) {
      var $__0,
          $__1,
          $__30,
          $__31,
          x;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 22;
              break;
            case 22:
              $ctx.state = (!($__1 = $__0.next()).done) ? 17 : -2;
              break;
            case 17:
              $ctx.pushTry(15, null);
              $ctx.state = 18;
              break;
            case 18:
              throw undefined;
              $ctx.state = 20;
              break;
            case 20:
              $ctx.popTry();
              $ctx.state = 22;
              break;
            case 15:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 13;
              break;
            case 13:
              x = $__1.value;
              $ctx.state = 14;
              break;
            case 14:
              $__30 = fn(x)[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__31 = $__30[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__31.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__31.value;
              $ctx.state = 22;
              break;
            case 2:
              $ctx.state = 12;
              return $__31.value;
            default:
              return $ctx.end();
          }
      }, $__29, this);
    }));
    prototypeAndStatic("drop", $traceurRuntime.initGeneratorFunction(function $__32(n) {
      var i,
          $__0,
          $__1,
          x,
          $__33,
          $__34;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 36;
              break;
            case 36:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 19;
              break;
            case 19:
              $ctx.state = (!($__1 = $__0.next()).done) ? 14 : 21;
              break;
            case 14:
              $ctx.pushTry(12, null);
              $ctx.state = 15;
              break;
            case 15:
              throw undefined;
              $ctx.state = 17;
              break;
            case 17:
              $ctx.popTry();
              $ctx.state = 19;
              break;
            case 12:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 10;
              break;
            case 10:
              x = $__1.value;
              $ctx.state = 11;
              break;
            case 11:
              $ctx.state = (i++ < n) ? 19 : 2;
              break;
            case 2:
              $ctx.state = 5;
              return x;
            case 5:
              $ctx.maybeThrow();
              $ctx.state = 21;
              break;
            case 21:
              $__33 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 34;
              break;
            case 34:
              $__34 = $__33[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 31;
              break;
            case 31:
              $ctx.state = ($__34.done) ? 25 : 24;
              break;
            case 25:
              $ctx.sent = $__34.value;
              $ctx.state = -2;
              break;
            case 24:
              $ctx.state = 34;
              return $__34.value;
            default:
              return $ctx.end();
          }
      }, $__32, this);
    }));
    prototypeAndStatic("dropWhile", $traceurRuntime.initGeneratorFunction(function $__35() {
      var fn,
          $__0,
          $__1,
          x,
          $__36,
          $__37;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              fn = $arguments[0] !== (void 0) ? $arguments[0] : Boolean;
              $ctx.state = 36;
              break;
            case 36:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 19;
              break;
            case 19:
              $ctx.state = (!($__1 = $__0.next()).done) ? 14 : 21;
              break;
            case 14:
              $ctx.pushTry(12, null);
              $ctx.state = 15;
              break;
            case 15:
              throw undefined;
              $ctx.state = 17;
              break;
            case 17:
              $ctx.popTry();
              $ctx.state = 19;
              break;
            case 12:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 10;
              break;
            case 10:
              x = $__1.value;
              $ctx.state = 11;
              break;
            case 11:
              $ctx.state = (fn(x)) ? 19 : 2;
              break;
            case 2:
              $ctx.state = 5;
              return x;
            case 5:
              $ctx.maybeThrow();
              $ctx.state = 21;
              break;
            case 21:
              $__36 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 34;
              break;
            case 34:
              $__37 = $__36[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 31;
              break;
            case 31:
              $ctx.state = ($__37.done) ? 25 : 24;
              break;
            case 25:
              $ctx.sent = $__37.value;
              $ctx.state = -2;
              break;
            case 24:
              $ctx.state = 34;
              return $__37.value;
            default:
              return $ctx.end();
          }
      }, $__35, this);
    }));
    prototypeAndStatic("enumerate", function() {
      return _zip([this, wu.count()]);
    });
    prototypeAndStatic("filter", $traceurRuntime.initGeneratorFunction(function $__38() {
      var fn,
          $__0,
          $__1,
          x;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              fn = $arguments[0] !== (void 0) ? $arguments[0] : Boolean;
              $ctx.state = 20;
              break;
            case 20:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 15;
              break;
            case 15:
              $ctx.state = (!($__1 = $__0.next()).done) ? 10 : -2;
              break;
            case 10:
              $ctx.pushTry(8, null);
              $ctx.state = 11;
              break;
            case 11:
              throw undefined;
              $ctx.state = 13;
              break;
            case 13:
              $ctx.popTry();
              $ctx.state = 15;
              break;
            case 8:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 6;
              break;
            case 6:
              x = $__1.value;
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (fn(x)) ? 1 : 15;
              break;
            case 1:
              $ctx.state = 2;
              return x;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 15;
              break;
            default:
              return $ctx.end();
          }
      }, $__38, this);
    }));
    prototypeAndStatic("flatten", $traceurRuntime.initGeneratorFunction(function $__39() {
      var shallow,
          $__0,
          $__1,
          $__40,
          $__41,
          x;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              shallow = $arguments[0] !== (void 0) ? $arguments[0] : false;
              $ctx.state = 32;
              break;
            case 32:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 27;
              break;
            case 27:
              $ctx.state = (!($__1 = $__0.next()).done) ? 22 : -2;
              break;
            case 22:
              $ctx.pushTry(20, null);
              $ctx.state = 23;
              break;
            case 23:
              throw undefined;
              $ctx.state = 25;
              break;
            case 25:
              $ctx.popTry();
              $ctx.state = 27;
              break;
            case 20:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 18;
              break;
            case 18:
              x = $__1.value;
              $ctx.state = 19;
              break;
            case 19:
              $ctx.state = (typeof x !== "string" && isIterable(x)) ? 11 : 13;
              break;
            case 11:
              $__40 = shallow ? x : wu.flatten(x)[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__41 = $__40[$traceurRuntime.toProperty($ctx.action)]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__41.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__41.value;
              $ctx.state = 27;
              break;
            case 2:
              $ctx.state = 12;
              return $__41.value;
            case 13:
              $ctx.state = 14;
              return x;
            case 14:
              $ctx.maybeThrow();
              $ctx.state = 27;
              break;
            default:
              return $ctx.end();
          }
      }, $__39, this);
    }));
    prototypeAndStatic("invoke", $traceurRuntime.initGeneratorFunction(function $__42(name) {
      var $__10,
          args,
          $__5,
          $__0,
          $__1,
          x;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              for (args = [], $__5 = 1; $__5 < $arguments.length; $__5++)
                $traceurRuntime.setProperty(args, $__5 - 1, $arguments[$traceurRuntime.toProperty($__5)]);
              $ctx.state = 19;
              break;
            case 19:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = (!($__1 = $__0.next()).done) ? 9 : -2;
              break;
            case 9:
              $ctx.pushTry(7, null);
              $ctx.state = 10;
              break;
            case 10:
              throw undefined;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.popTry();
              $ctx.state = 14;
              break;
            case 7:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 5;
              break;
            case 5:
              x = $__1.value;
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return ($__10 = x)[$traceurRuntime.toProperty(name)].apply($__10, $traceurRuntime.toObject(args));
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 14;
              break;
            default:
              return $ctx.end();
          }
      }, $__42, this);
    }));
    prototypeAndStatic("map", $traceurRuntime.initGeneratorFunction(function $__43(fn) {
      var $__0,
          $__1,
          x;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = (!($__1 = $__0.next()).done) ? 9 : -2;
              break;
            case 9:
              $ctx.pushTry(7, null);
              $ctx.state = 10;
              break;
            case 10:
              throw undefined;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.popTry();
              $ctx.state = 14;
              break;
            case 7:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 5;
              break;
            case 5:
              x = $__1.value;
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return fn(x);
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 14;
              break;
            default:
              return $ctx.end();
          }
      }, $__43, this);
    }));
    prototypeAndStatic("pluck", $traceurRuntime.initGeneratorFunction(function $__44(name) {
      var $__0,
          $__1,
          x;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = (!($__1 = $__0.next()).done) ? 9 : -2;
              break;
            case 9:
              $ctx.pushTry(7, null);
              $ctx.state = 10;
              break;
            case 10:
              throw undefined;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.popTry();
              $ctx.state = 14;
              break;
            case 7:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 5;
              break;
            case 5:
              x = $__1.value;
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return x[$traceurRuntime.toProperty(name)];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 14;
              break;
            default:
              return $ctx.end();
          }
      }, $__44, this);
    }));
    prototypeAndStatic("reductions", $traceurRuntime.initGeneratorFunction(function $__45(fn) {
      var initial,
          val,
          $__0,
          $__1,
          $__2,
          $__3,
          x;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              initial = $arguments[1];
              val = initial;
              $ctx.state = 43;
              break;
            case 43:
              $ctx.state = (val === undefined) ? 17 : 16;
              break;
            case 17:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = (!($__1 = $__0.next()).done) ? 9 : 16;
              break;
            case 9:
              $ctx.pushTry(7, null);
              $ctx.state = 10;
              break;
            case 10:
              throw undefined;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.popTry();
              $ctx.state = 14;
              break;
            case 7:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 5;
              break;
            case 5:
              x = $__1.value;
              $ctx.state = 6;
              break;
            case 6:
              val = x;
              $ctx.state = 16;
              break;
            case 16:
              $ctx.state = 20;
              return val;
            case 20:
              $ctx.maybeThrow();
              $ctx.state = 22;
              break;
            case 22:
              $__2 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 36;
              break;
            case 36:
              $ctx.state = (!($__3 = $__2.next()).done) ? 31 : 38;
              break;
            case 31:
              $ctx.pushTry(29, null);
              $ctx.state = 32;
              break;
            case 32:
              throw undefined;
              $ctx.state = 34;
              break;
            case 34:
              $ctx.popTry();
              $ctx.state = 36;
              break;
            case 29:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 27;
              break;
            case 27:
              x = $__3.value;
              $ctx.state = 28;
              break;
            case 28:
              $ctx.state = 24;
              return val = fn(val, x);
            case 24:
              $ctx.maybeThrow();
              $ctx.state = 36;
              break;
            case 38:
              $ctx.returnValue = val;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__45, this);
    }));
    prototypeAndStatic("reject", $traceurRuntime.initGeneratorFunction(function $__46() {
      var fn,
          $__0,
          $__1,
          x;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              fn = $arguments[0] !== (void 0) ? $arguments[0] : Boolean;
              $ctx.state = 20;
              break;
            case 20:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 15;
              break;
            case 15:
              $ctx.state = (!($__1 = $__0.next()).done) ? 10 : -2;
              break;
            case 10:
              $ctx.pushTry(8, null);
              $ctx.state = 11;
              break;
            case 11:
              throw undefined;
              $ctx.state = 13;
              break;
            case 13:
              $ctx.popTry();
              $ctx.state = 15;
              break;
            case 8:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 6;
              break;
            case 6:
              x = $__1.value;
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (!fn(x)) ? 1 : 15;
              break;
            case 1:
              $ctx.state = 2;
              return x;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 15;
              break;
            default:
              return $ctx.end();
          }
      }, $__46, this);
    }));
    prototypeAndStatic("slice", $traceurRuntime.initGeneratorFunction(function $__47() {
      var start,
          stop,
          $__0,
          $__1,
          $__9,
          x,
          i;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              start = $arguments[0] !== (void 0) ? $arguments[0] : 0;
              stop = $arguments[1] !== (void 0) ? $arguments[1] : Infinity;
              if (stop < start) {
                throw new RangeError("parameter `stop` (= " + stop + ") must be >= `start` (= " + start + ")");
              }
              $ctx.state = 43;
              break;
            case 43:
              $__0 = this.enumerate()[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 38;
              break;
            case 38:
              $ctx.state = (!($__1 = $__0.next()).done) ? 33 : -2;
              break;
            case 33:
              $ctx.pushTry(31, null);
              $ctx.state = 34;
              break;
            case 34:
              throw undefined;
              $ctx.state = 36;
              break;
            case 36:
              $ctx.popTry();
              $ctx.state = 38;
              break;
            case 31:
              $ctx.popTry();
              i = $ctx.storedException;
              $ctx.state = 24;
              break;
            case 24:
              $ctx.pushTry(22, null);
              $ctx.state = 25;
              break;
            case 25:
              throw undefined;
              $ctx.state = 27;
              break;
            case 27:
              $ctx.popTry();
              $ctx.state = 38;
              break;
            case 22:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 15;
              break;
            case 15:
              $ctx.pushTry(13, null);
              $ctx.state = 16;
              break;
            case 16:
              throw undefined;
              $ctx.state = 18;
              break;
            case 18:
              $ctx.popTry();
              $ctx.state = 38;
              break;
            case 13:
              $ctx.popTry();
              $__9 = $ctx.storedException;
              $ctx.state = 11;
              break;
            case 11:
              {
                $__9 = $traceurRuntime.assertObject($__1.value);
                x = $__9[0];
                i = $__9[1];
              }
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < start) ? 38 : 2;
              break;
            case 2:
              $ctx.state = (i >= stop) ? -2 : 5;
              break;
            case 5:
              $ctx.state = 8;
              return x;
            case 8:
              $ctx.maybeThrow();
              $ctx.state = 38;
              break;
            default:
              return $ctx.end();
          }
      }, $__47, this);
    }));
    prototypeAndStatic("spreadMap", $traceurRuntime.initGeneratorFunction(function $__48(fn) {
      var $__0,
          $__1,
          x;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = (!($__1 = $__0.next()).done) ? 9 : -2;
              break;
            case 9:
              $ctx.pushTry(7, null);
              $ctx.state = 10;
              break;
            case 10:
              throw undefined;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.popTry();
              $ctx.state = 14;
              break;
            case 7:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 5;
              break;
            case 5:
              x = $__1.value;
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return fn.apply(null, $traceurRuntime.toObject(x));
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 14;
              break;
            default:
              return $ctx.end();
          }
      }, $__48, this);
    }));
    prototypeAndStatic("take", $traceurRuntime.initGeneratorFunction(function $__49(n) {
      var i,
          $__0,
          $__1,
          x;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = (n < 1) ? 1 : 2;
              break;
            case 1:
              $ctx.state = -2;
              break;
            case 2:
              i = 0;
              $ctx.state = 25;
              break;
            case 25:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 20;
              break;
            case 20:
              $ctx.state = (!($__1 = $__0.next()).done) ? 15 : -2;
              break;
            case 15:
              $ctx.pushTry(13, null);
              $ctx.state = 16;
              break;
            case 16:
              throw undefined;
              $ctx.state = 18;
              break;
            case 18:
              $ctx.popTry();
              $ctx.state = 20;
              break;
            case 13:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 11;
              break;
            case 11:
              x = $__1.value;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = 5;
              return x;
            case 5:
              $ctx.maybeThrow();
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (++i >= n) ? -2 : 20;
              break;
            default:
              return $ctx.end();
          }
      }, $__49, this);
    }));
    prototypeAndStatic("takeWhile", $traceurRuntime.initGeneratorFunction(function $__50() {
      var fn,
          $__0,
          $__1,
          x;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              fn = $arguments[0] !== (void 0) ? $arguments[0] : Boolean;
              $ctx.state = 22;
              break;
            case 22:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 17;
              break;
            case 17:
              $ctx.state = (!($__1 = $__0.next()).done) ? 12 : -2;
              break;
            case 12:
              $ctx.pushTry(10, null);
              $ctx.state = 13;
              break;
            case 13:
              throw undefined;
              $ctx.state = 15;
              break;
            case 15:
              $ctx.popTry();
              $ctx.state = 17;
              break;
            case 10:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 8;
              break;
            case 8:
              x = $__1.value;
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (!fn(x)) ? -2 : 2;
              break;
            case 2:
              $ctx.state = 5;
              return x;
            case 5:
              $ctx.maybeThrow();
              $ctx.state = 17;
              break;
            default:
              return $ctx.end();
          }
      }, $__50, this);
    }));
    prototypeAndStatic("tap", $traceurRuntime.initGeneratorFunction(function $__51() {
      var fn,
          $__0,
          $__1,
          x;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              fn = $arguments[0] !== (void 0) ? $arguments[0] : console.log.bind(console);
              $ctx.state = 21;
              break;
            case 21:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 16;
              break;
            case 16:
              $ctx.state = (!($__1 = $__0.next()).done) ? 11 : -2;
              break;
            case 11:
              $ctx.pushTry(9, null);
              $ctx.state = 12;
              break;
            case 12:
              throw undefined;
              $ctx.state = 14;
              break;
            case 14:
              $ctx.popTry();
              $ctx.state = 16;
              break;
            case 9:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 7;
              break;
            case 7:
              x = $__1.value;
              $ctx.state = 8;
              break;
            case 8:
              fn(x);
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return x;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 16;
              break;
            default:
              return $ctx.end();
          }
      }, $__51, this);
    }));
    prototypeAndStatic("unique", $traceurRuntime.initGeneratorFunction(function $__52() {
      var seen,
          $__0,
          $__1,
          x;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              seen = new Set();
              $ctx.state = 22;
              break;
            case 22:
              $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 17;
              break;
            case 17:
              $ctx.state = (!($__1 = $__0.next()).done) ? 12 : 19;
              break;
            case 12:
              $ctx.pushTry(10, null);
              $ctx.state = 13;
              break;
            case 13:
              throw undefined;
              $ctx.state = 15;
              break;
            case 15:
              $ctx.popTry();
              $ctx.state = 17;
              break;
            case 10:
              $ctx.popTry();
              x = $ctx.storedException;
              $ctx.state = 8;
              break;
            case 8:
              x = $__1.value;
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (!seen.has(x)) ? 1 : 17;
              break;
            case 1:
              $ctx.state = 2;
              return x;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              seen.add(x);
              $ctx.state = 17;
              break;
            case 19:
              seen.clear();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__52, this);
    }));
    var _zip = $traceurRuntime.initGeneratorFunction(function $__53(iterables) {
      var longest,
          iters,
          numIters,
          numFinished,
          finished,
          $__0,
          $__1,
          $__9,
          value,
          done,
          it,
          zipped;
      var $arguments = arguments;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              longest = $arguments[1] !== (void 0) ? $arguments[1] : false;
              $ctx.state = 71;
              break;
            case 71:
              $ctx.state = (!iterables.length) ? 1 : 2;
              break;
            case 1:
              $ctx.state = -2;
              break;
            case 2:
              iters = iterables.map(getIterator);
              numIters = iterables.length;
              numFinished = 0;
              finished = false;
              $ctx.state = 73;
              break;
            case 73:
              $ctx.state = (!finished) ? 62 : -2;
              break;
            case 62:
              $ctx.pushTry(60, null);
              $ctx.state = 63;
              break;
            case 63:
              throw undefined;
              $ctx.state = 65;
              break;
            case 65:
              $ctx.popTry();
              $ctx.state = 73;
              break;
            case 60:
              $ctx.popTry();
              zipped = $ctx.storedException;
              $ctx.state = 58;
              break;
            case 58:
              zipped = [];
              $ctx.state = 59;
              break;
            case 59:
              $__0 = iters[$traceurRuntime.toProperty(Symbol.iterator)]();
              $ctx.state = 50;
              break;
            case 50:
              $ctx.state = (!($__1 = $__0.next()).done) ? 45 : 52;
              break;
            case 45:
              $ctx.pushTry(43, null);
              $ctx.state = 46;
              break;
            case 46:
              throw undefined;
              $ctx.state = 48;
              break;
            case 48:
              $ctx.popTry();
              $ctx.state = 50;
              break;
            case 43:
              $ctx.popTry();
              it = $ctx.storedException;
              $ctx.state = 41;
              break;
            case 41:
              it = $__1.value;
              $ctx.state = 42;
              break;
            case 42:
              $ctx.pushTry(32, null);
              $ctx.state = 35;
              break;
            case 35:
              throw undefined;
              $ctx.state = 37;
              break;
            case 37:
              $ctx.popTry();
              $ctx.state = 50;
              break;
            case 32:
              $ctx.popTry();
              done = $ctx.storedException;
              $ctx.state = 25;
              break;
            case 25:
              $ctx.pushTry(23, null);
              $ctx.state = 26;
              break;
            case 26:
              throw undefined;
              $ctx.state = 28;
              break;
            case 28:
              $ctx.popTry();
              $ctx.state = 50;
              break;
            case 23:
              $ctx.popTry();
              value = $ctx.storedException;
              $ctx.state = 16;
              break;
            case 16:
              $ctx.pushTry(14, null);
              $ctx.state = 17;
              break;
            case 17:
              throw undefined;
              $ctx.state = 19;
              break;
            case 19:
              $ctx.popTry();
              $ctx.state = 50;
              break;
            case 14:
              $ctx.popTry();
              $__9 = $ctx.storedException;
              $ctx.state = 10;
              break;
            case 10:
              {
                $__9 = $traceurRuntime.assertObject(it.next());
                value = $__9.value;
                done = $__9.done;
              }
              $ctx.state = 11;
              break;
            case 11:
              $ctx.state = (done) ? 6 : 8;
              break;
            case 6:
              $ctx.state = (!longest) ? 4 : 5;
              break;
            case 4:
              $ctx.state = -2;
              break;
            case 5:
              if (++numFinished == numIters) {
                finished = true;
              }
              $ctx.state = 8;
              break;
            case 8:
              if (value === undefined) {
                zipped.length++;
              } else {
                zipped.push(value);
              }
              $ctx.state = 50;
              break;
            case 52:
              $ctx.state = 55;
              return zipped;
            case 55:
              $ctx.maybeThrow();
              $ctx.state = 73;
              break;
            default:
              return $ctx.end();
          }
      }, $__53, this);
    });
    _zip.prototype = wu.prototype;
    staticMethod("zip", function() {
      for (var iterables = [],
          $__6 = 0; $__6 < arguments.length; $__6++)
        $traceurRuntime.setProperty(iterables, $__6, arguments[$traceurRuntime.toProperty($__6)]);
      return _zip(iterables);
    });
    staticMethod("zipLongest", function() {
      for (var iterables = [],
          $__7 = 0; $__7 < arguments.length; $__7++)
        $traceurRuntime.setProperty(iterables, $__7, arguments[$traceurRuntime.toProperty($__7)]);
      return _zip(iterables, true);
    });
    staticMethod("zipWith", function(fn) {
      for (var iterables = [],
          $__8 = 1; $__8 < arguments.length; $__8++)
        $traceurRuntime.setProperty(iterables, $__8 - 1, arguments[$traceurRuntime.toProperty($__8)]);
      return _zip(iterables).spreadMap(fn);
    });
    wu.MAX_BLOCK = 15;
    wu.TIMEOUT = 1;
    prototypeAndStatic("asyncEach", function(fn) {
      var maxBlock = arguments[1] !== (void 0) ? arguments[1] : wu.MAX_BLOCK;
      var timeout = arguments[2] !== (void 0) ? arguments[2] : wu.TIMEOUT;
      var iter = this[$traceurRuntime.toProperty(wu.iteratorSymbol)]();
      return new Promise((function(resolve, reject) {
        (function loop() {
          var start = Date.now();
          for (var $__0 = iter[$traceurRuntime.toProperty(Symbol.iterator)](),
              $__1; !($__1 = $__0.next()).done; ) {
            try {
              throw undefined;
            } catch (x) {
              x = $__1.value;
              {
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
            }
          }
          resolve();
        }());
      }));
    });
    prototypeAndStatic("every", function() {
      var fn = arguments[0] !== (void 0) ? arguments[0] : Boolean;
      for (var $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__1; !($__1 = $__0.next()).done; ) {
        try {
          throw undefined;
        } catch (x) {
          x = $__1.value;
          {
            if (!fn(x)) {
              return false;
            }
          }
        }
      }
      return true;
    });
    prototypeAndStatic("find", function(fn) {
      for (var $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__1; !($__1 = $__0.next()).done; ) {
        try {
          throw undefined;
        } catch (x) {
          x = $__1.value;
          {
            if (fn(x)) {
              return x;
            }
          }
        }
      }
    });
    prototypeAndStatic("forEach", function(fn) {
      for (var $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__1; !($__1 = $__0.next()).done; ) {
        try {
          throw undefined;
        } catch (x) {
          x = $__1.value;
          {
            fn(x);
          }
        }
      }
    });
    prototypeAndStatic("has", function(thing) {
      return this.some((function(x) {
        return x === thing;
      }));
    });
    prototypeAndStatic("reduce", function(fn) {
      var initial = arguments[1];
      var val = initial;
      if (val === undefined) {
        for (var $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)](),
            $__1; !($__1 = $__0.next()).done; ) {
          try {
            throw undefined;
          } catch (x) {
            x = $__1.value;
            {
              val = x;
              break;
            }
          }
        }
      }
      for (var $__2 = this[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__3; !($__3 = $__2.next()).done; ) {
        try {
          throw undefined;
        } catch (x) {
          x = $__3.value;
          {
            val = fn(val, x);
          }
        }
      }
      return val;
    });
    prototypeAndStatic("some", function() {
      var fn = arguments[0] !== (void 0) ? arguments[0] : Boolean;
      for (var $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__1; !($__1 = $__0.next()).done; ) {
        try {
          throw undefined;
        } catch (x) {
          x = $__1.value;
          {
            if (fn(x)) {
              return true;
            }
          }
        }
      }
      return false;
    });
    prototypeAndStatic("toArray", function() {
      var array = [];
      for (var $__0 = this[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__1; !($__1 = $__0.next()).done; ) {
        try {
          throw undefined;
        } catch (x) {
          x = $__1.value;
          {
            array.push(x);
          }
        }
      }
      return array;
    });
    var _tee = $traceurRuntime.initGeneratorFunction(function $__54(iterator, cache) {
      var items,
          index,
          $__9,
          done,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              items = $traceurRuntime.assertObject(cache).items;
              index = 0;
              $ctx.state = 64;
              break;
            case 64:
              $ctx.state = (true) ? 59 : 60;
              break;
            case 59:
              $ctx.state = (index === items.length) ? 32 : 58;
              break;
            case 32:
              $ctx.pushTry(30, null);
              $ctx.state = 33;
              break;
            case 33:
              throw undefined;
              $ctx.state = 35;
              break;
            case 35:
              $ctx.popTry();
              $ctx.state = 64;
              break;
            case 30:
              $ctx.popTry();
              value = $ctx.storedException;
              $ctx.state = 23;
              break;
            case 23:
              $ctx.pushTry(21, null);
              $ctx.state = 24;
              break;
            case 24:
              throw undefined;
              $ctx.state = 26;
              break;
            case 26:
              $ctx.popTry();
              $ctx.state = 64;
              break;
            case 21:
              $ctx.popTry();
              done = $ctx.storedException;
              $ctx.state = 14;
              break;
            case 14:
              $ctx.pushTry(12, null);
              $ctx.state = 15;
              break;
            case 15:
              throw undefined;
              $ctx.state = 17;
              break;
            case 17:
              $ctx.popTry();
              $ctx.state = 64;
              break;
            case 12:
              $ctx.popTry();
              $__9 = $ctx.storedException;
              $ctx.state = 10;
              break;
            case 10:
              {
                $__9 = $traceurRuntime.assertObject(iterator.next());
                done = $__9.done;
                value = $__9.value;
              }
              $ctx.state = 11;
              break;
            case 11:
              $ctx.state = (done) ? 3 : 2;
              break;
            case 3:
              if (cache.returned === MISSING) {
                cache.returned = value;
              }
              $ctx.state = 60;
              break;
            case 2:
              $ctx.state = 7;
              return $traceurRuntime.setProperty(items, index++, value);
            case 7:
              $ctx.maybeThrow();
              $ctx.state = 64;
              break;
            case 58:
              $ctx.state = (index === cache.tail) ? 47 : 54;
              break;
            case 47:
              $ctx.pushTry(45, null);
              $ctx.state = 48;
              break;
            case 48:
              throw undefined;
              $ctx.state = 50;
              break;
            case 50:
              $ctx.popTry();
              $ctx.state = 64;
              break;
            case 45:
              $ctx.popTry();
              value = $ctx.storedException;
              $ctx.state = 43;
              break;
            case 43:
              value = items[$traceurRuntime.toProperty(index)];
              if (index === 500) {
                items = cache.items = items.slice(index);
                index = 0;
                cache.tail = 0;
              } else {
                $traceurRuntime.setProperty(items, index, undefined);
                cache.tail = ++index;
              }
              $ctx.state = 44;
              break;
            case 44:
              $ctx.state = 40;
              return value;
            case 40:
              $ctx.maybeThrow();
              $ctx.state = 64;
              break;
            case 54:
              $ctx.state = 55;
              return items[$traceurRuntime.toProperty(index++)];
            case 55:
              $ctx.maybeThrow();
              $ctx.state = 64;
              break;
            case 60:
              if (cache.tail === index) {
                items.length = 0;
              }
              $ctx.state = 66;
              break;
            case 66:
              $ctx.returnValue = cache.returned;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__54, this);
    });
    _tee.prototype = wu.prototype;
    prototypeAndStatic("tee", function() {
      var n = arguments[0] !== (void 0) ? arguments[0] : 2;
      var iterables = new Array(n);
      var cache = {
        tail: 0,
        items: [],
        returned: MISSING
      };
      while (n--) {
        $traceurRuntime.setProperty(iterables, n, _tee(this, cache));
      }
      return iterables;
    });
    prototypeAndStatic("unzip", function() {
      var n = arguments[0] !== (void 0) ? arguments[0] : 2;
      return this.tee(n).map((function(iter, i) {
        return iter.pluck(i);
      }));
    });
    wu.tang = {clan: 36};
    return wu;
  }));
  return {};
}).call(typeof global !== 'undefined' ? global : this);

//# sourceMappingURL=wu.es5.map
