// traceur-runtime.js
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $getPrototypeOf = $Object.getPrototypeOf;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var types = {
    void: function voidType() {},
    any: function any() {},
    string: function string() {},
    number: function number() {},
    boolean: function boolean() {}
  };
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  Symbol.iterator = Symbol();
  freeze(SymbolValue.prototype);
  function toProperty(name) {
    if (isSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function getOwnPropertyNames(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!symbolValues[name] && !privateNames[name])
        rv.push(name);
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol)
        rv.push(symbol);
    }
    return rv;
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function setProperty(object, name, value) {
    var sym,
        desc;
    if (isSymbol(name)) {
      sym = name;
      name = name[symbolInternalProperty];
    }
    object[name] = value;
    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
      $defineProperty(object, name, {enumerable: false});
    return value;
  }
  function defineProperty(object, name, descriptor) {
    if (isSymbol(name)) {
      if (descriptor.enumerable) {
        descriptor = $create(descriptor, {enumerable: {value: false}});
      }
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    Object.getOwnPropertySymbols = getOwnPropertySymbols;
    function is(left, right) {
      if (left === right)
        return left !== 0 || 1 / left === 1 / right;
      return left !== left && right !== right;
    }
    $defineProperty(Object, 'is', method(is));
    function assign(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        var props = $keys(source);
        var p,
            length = props.length;
        for (p = 0; p < length; p++) {
          var name = props[p];
          if (privateNames[name])
            continue;
          target[name] = source[name];
        }
      }
      return target;
    }
    $defineProperty(Object, 'assign', method(assign));
    function mixin(target, source) {
      var props = $getOwnPropertyNames(source);
      var p,
          descriptor,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (privateNames[name])
          continue;
        descriptor = $getOwnPropertyDescriptor(source, props[p]);
        $defineProperty(target, props[p], descriptor);
      }
      return target;
    }
    $defineProperty(Object, 'mixin', method(mixin));
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (privateNames[name])
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function assertObject(x) {
    if (!isObject(x))
      throw $TypeError(x + ' is not an Object');
    return x;
  }
  function spread() {
    var rv = [],
        k = 0;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = toObject(arguments[i]);
      for (var j = 0; j < valueToSpread.length; j++) {
        rv[k++] = valueToSpread[j];
      }
    }
    return rv;
  }
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError("super has no setter '" + name + "'.");
  }
  function getDescriptors(object) {
    var descriptors = {},
        name,
        names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
    }
    if (superClass === null)
      return null;
    throw new TypeError();
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        throw new Error(("\"" + action + "\" on closed generator"));
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
  });
  defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = Object.create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  function setupGlobals(global) {
    global.Symbol = Symbol;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    assertObject: assertObject,
    asyncWrap: asyncWrap,
    createClass: createClass,
    defaultSuperCall: defaultSuperCall,
    exportStar: exportStar,
    initGeneratorFunction: initGeneratorFunction,
    createGeneratorInstance: createGeneratorInstance,
    getOwnHashObject: getOwnHashObject,
    setProperty: setProperty,
    setupGlobals: setupGlobals,
    spread: spread,
    superCall: superCall,
    superGet: superGet,
    superSet: superSet,
    toObject: toObject,
    toProperty: toProperty,
    type: types,
    typeof: typeOf
  };
})(typeof global !== 'undefined' ? global : this);
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime.assertObject($traceurRuntime),
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      return this.value_ = this.func.call(global);
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== "string")
        throw new TypeError("module name must be a string, not " + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__0 = arguments;
            var depMap = {};
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof global !== 'undefined' ? global : this);
System.register("traceur-runtime@0.0.41/src/runtime/polyfills/utils", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfills/utils";
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x | 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function toInteger(x) {
    x = +x;
    if (isNaN(x))
      return 0;
    if (!isFinite(x) || x === 0)
      return x;
    return x > 0 ? Math.floor(x) : Math.ceil(x);
  }
  var MAX_SAFE_LENGTH = Math.pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : Math.min(len, MAX_SAFE_LENGTH);
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    }
  };
});
System.register("traceur-runtime@0.0.41/src/runtime/polyfills/Array", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfills/Array";
  var $__3 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/utils")),
      toInteger = $__3.toInteger,
      toLength = $__3.toLength,
      toObject = $__3.toObject,
      isCallable = $__3.isCallable;
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      if (i in object) {
        var value = object[i];
        if (predicate.call(thisArg, value, i, object)) {
          return returnIndex ? i : value;
        }
      }
    }
    return returnIndex ? -1 : undefined;
  }
  return {
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    }
  };
});
System.register("traceur-runtime@0.0.41/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__5;
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfills/ArrayIterator";
  var $__6 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/utils")),
      toObject = $__6.toObject,
      toUint32 = $__6.toUint32;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__5 = {}, Object.defineProperty($__5, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__5, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__5), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.register("traceur-runtime@0.0.41/src/runtime/polyfills/Map", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfills/Map";
  var isObject = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/utils")).isObject;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function Map() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError("Constructor Map requires 'new'");
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError("Map can not be reentrantly initialised");
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      var iter = iterable[Symbol.iterator];
      if (iter !== undefined) {
        for (var $__8 = iterable[Symbol.iterator](),
            $__9; !($__9 = $__8.next()).done; ) {
          var $__10 = $traceurRuntime.assertObject($__9.value),
              key = $__10[0],
              value = $__10[1];
          {
            this.set(key, value);
          }
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index = lookupIndex(this, key);
      if (index !== undefined) {
        this.entries_[index + 1] = value;
      } else {
        index = this.entries_.length;
        this.entries_[index] = key;
        this.entries_[index + 1] = value;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          var hash = hashObject.hash;
          this.objectIndex_[hash] = index;
        } else if (stringMode) {
          this.stringIndex_[key] = index;
        } else {
          this.primitiveIndex_[key] = index;
        }
      }
      return this;
    },
    has: function(key) {
      return lookupIndex(this, key) !== undefined;
    },
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index;
      var hash;
      if (objectMode) {
        var hashObject = getOwnHashObject(key);
        if (hashObject) {
          index = this.objectIndex_[hash = hashObject.hash];
          delete this.objectIndex_[hash];
        }
      } else if (stringMode) {
        index = this.stringIndex_[key];
        delete this.stringIndex_[key];
      } else {
        index = this.primitiveIndex_[key];
        delete this.primitiveIndex_[key];
      }
      if (index !== undefined) {
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
      }
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0,
          len = this.entries_.length; i < len; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    }
  }, {});
  return {get Map() {
      return Map;
    }};
});
System.register("traceur-runtime@0.0.41/node_modules/rsvp/lib/rsvp/asap", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/node_modules/rsvp/lib/rsvp/asap";
  var $__default = function asap(callback, arg) {
    var length = queue.push([callback, arg]);
    if (length === 1) {
      scheduleFlush();
    }
  };
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = [];
  function flush() {
    for (var i = 0; i < queue.length; i++) {
      var tuple = queue[i];
      var callback = tuple[0],
          arg = tuple[1];
      callback(arg);
    }
    queue = [];
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.41/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfills/Promise";
  var async = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/node_modules/rsvp/lib/rsvp/asap")).default;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function Promise(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }, onReject);
    }
  }, {
    resolve: function(x) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), +1, x);
      } else {
        return new this(function(resolve, reject) {
          resolve(x);
        });
      }
    },
    reject: function(r) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), -1, r);
      } else {
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    cast: function(x) {
      if (x instanceof this)
        return x;
      if (isPromise(x)) {
        var result = getDeferred(this);
        chain(x, result.resolve, result.reject);
        return result.promise;
      }
      return this.resolve(x);
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var resolutions = [];
      try {
        var count = values.length;
        if (count === 0) {
          deferred.resolve(resolutions);
        } else {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(i, x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
          }
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  return {get Promise() {
      return Promise;
    }};
});
System.register("traceur-runtime@0.0.41/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfills/String";
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function contains(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get contains() {
      return contains;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    }
  };
});
System.register("traceur-runtime@0.0.41/src/runtime/polyfills/polyfills", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfills/polyfills";
  var Map = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/Map")).Map;
  var Promise = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/Promise")).Promise;
  var $__13 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/String")),
      codePointAt = $__13.codePointAt,
      contains = $__13.contains,
      endsWith = $__13.endsWith,
      fromCodePoint = $__13.fromCodePoint,
      repeat = $__13.repeat,
      raw = $__13.raw,
      startsWith = $__13.startsWith;
  var $__13 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/Array")),
      fill = $__13.fill,
      find = $__13.find,
      findIndex = $__13.findIndex;
  var $__13 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/ArrayIterator")),
      entries = $__13.entries,
      keys = $__13.keys,
      values = $__13.values;
  function maybeDefineMethod(object, name, value) {
    if (!(name in object)) {
      Object.defineProperty(object, name, {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  function polyfillCollections(global) {
    if (!global.Map)
      global.Map = Map;
  }
  function polyfillString(String) {
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
  }
  function polyfillArray(Array, Symbol) {
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    if (Symbol && Symbol.iterator) {
      Object.defineProperty(Array.prototype, Symbol.iterator, {
        value: values,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }
  function polyfill(global) {
    polyfillPromise(global);
    polyfillCollections(global);
    polyfillString(global.String);
    polyfillArray(global.Array, global.Symbol);
  }
  polyfill(this);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfill(global);
  };
  return {};
});
System.register("traceur-runtime@0.0.41/src/runtime/polyfill-import", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.41/src/runtime/polyfill-import";
  var $__15 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.41/src/runtime/polyfills/polyfills"));
  return {};
});
System.get("traceur-runtime@0.0.41/src/runtime/polyfill-import" + '');
// wu.js
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
