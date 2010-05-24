(function (globals) {

    /**
     * Maintain local copies of frequently used functions and constants.
     */

    var OLD_WU = globals.wu,
    ARR_SLICE = Array.prototype.slice,
    UNDEF = undefined,
    NULL = null,

    /**
     * Define publicly exposed wu function.
     */

    wu = globals.wu = function wu(obj) {
        // TODO: switch/case on typeof(obj)
        return obj instanceof Function ?
            augmentFunction(obj) :
            wu.Iterator(obj);
    };

    wu.noConflict = function noConflict() {
        globals.wu = OLD_WU;
        return wu;
    };

    /**
     * General helpers.
     */

    var isInstance = function isInstance(obj, Type)  {
        return obj instanceof Type;
    },
    toObjProtoString = function toObjProtoString(obj) {
        return Object.prototype.toString.call(obj);
    },
    toIterator = function toIterator(obj) {
        return isInstance(obj, wu.Iterator) ?
            obj :
            new wu.Iterator(obj);
    },
    toArray = function toArray(obj) {
        return isInstance(obj, wu.Iterator) ?
            obj.toArray() :
            ARR_SLICE.call(obj);
    },
    toBool = function toBool(obj) {
        return !!obj;
    };

    /**
     * Iterators!
     */

    var StopIteration = wu.StopIteration = function StopIteration() {};
    StopIteration.prototype.toString = function toString() {
        return "[object StopIteration]";
    };

    var addNextMethod = function iterHelper(obj) {
        var pairs, prop, len, chr, items,
        attachNextForArrayLikeObjs = function attachNextForArrayLikeObjs(obj) {
            // Copy obj to items so that .shift() won't have side effects on
            // original.
            items = wu.toArray(obj);
            this.next = function next() {
                return items.length > 0 ?
                    items.shift() :
                    new wu.StopIteration;
            };
        };

        switch (toObjProtoString(obj)) {
            case "[object Array]":
                attachNextForArrayLikeObjs.call(this, obj);
                break;
            case "[object NodeList]":
                attachNextForArrayLikeObjs.call(this, obj);
                break;
            case "[object Object]":
                if (isInstance(obj, wu.Iterator)) {
                    if (typeof obj.next !== "function") {
                        throw new Error("Iterator without a next method!");
                    }
                    else {
                        NULL;
                    }
                }
                else if (obj.toString() === "[object Arguments]") {
                    attachNextForArrayLikeObjs.call(this, obj);
                }
                else {
                    pairs = [];
                    for (prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            pairs.push([prop, obj[prop]]);
                        }
                    }
                    addNextMethod.call(this, pairs);
                }
                break;
            case "[object String]":
                len = obj.length;
                this.next = function next() {
                    if (len > 0) {
                        chr = obj.charAt(0);
                        obj = obj.slice(1);
                        len--;
                        return chr;
                    }
                    else {
                        return new wu.StopIteration;
                    }
                };
                break;
            case "[object Number]":
                this.next = function next() {
                    return obj-- === 0 ?
                        new StopIteration :
                        obj;
                };
                break;
            default:
                throw new TypeError("Object is not iterable: " + obj);
        }
    };

    wu.Iterator = function Iterator(objOrFn) {
        if (isInstance(this, wu.Iterator) === false) {
            return new wu.Iterator(objOrFn);
        }


        // If the user passed in a function to use as the next method, use that
        // instead of duck typing our own.
        if (toObjProtoString(objOrFn) === "[object Function]") {
            this.next = objOrFn;
        }
        else {
            addNextMethod.call(this, objOrFn);
        }

        this.force = this.toArray = this.toArray || function toArray() {
            var item = this.next(),
                res = [];
            while ( !isInstance(item, wu.StopIteration) ) {
                res.push(item);
                item = this.next();
            }
            return res;
        };

        this.all    = this.all    || wu.curry(wu.all, this);
        this.any    = this.any    || wu.curry(wu.any, this);
        this.chain  = this.chain  || wu.curry(wu.chain, this);
        this.filter = this.filter || wu.curry(wu.filter, this);
        this.has    = this.has    || wu.curry(wu.has, this);
        this.map    = this.map    || wu.curry(wu.map, this);
        this.zip    = this.zip    || wu.curry(wu.zip, this);

        return UNDEF;
    };

    // Maintain prototype chain for Iterators.
    wu.Iterator.prototype = wu.prototype;

    /**
     * Methods attached to wu directly.
     *
     * TODO: filter, reduce, until, takeWhile, dropWhile, cycle, mapply (ie,
     * mapply(Math.pow, [[2,2], [3,3], [10,3]]) -> [4, 27, 1000]), each, join
     *
     * zip should take default element, instead of just using NULL all the time.
     *
     * map should handle multiple iterables (as should filter, reduce, each)
     *
     * MAYBE: lambda, partial, tee, sort
     */

    wu.all = function all(iterable, fn, context) {
        iterable = toIterator(iterable);
        fn = fn || wu.toBool;
        context = context || this;

        var item = iterable.next();

        while ( !isInstance(item, wu.StopIteration) ) {
            if ( !fn.call(context, item) ) {
                return false;
            }
            item = iterable.next();
        }
        return true;
    };

    wu.any = function any(iterable, fn, context) {
        var oppositeFn = fn === UNDEF ?
            function oppositeFn(obj) { return !toBool(obj); } :
            function oppositeFn(obj) {
                return !fn.call(context, obj);
            };
        return !wu.all(iterable, oppositeFn);
    };

    wu.bind = function bind(scope, fn /*, variadic number of arguments */) {
        var args = ARR_SLICE.call(arguments, 2);
        return function bound() {
            return fn.apply(scope, args.concat(wu.toArray(arguments)));
        };
    };

    wu.chain = function chain(/* variadic iterables */) {
        var i, index = 0, iterables = toArray(arguments);

        for (i = 0; i < iterables.length; i++) {
            iterables[i] = toIterator(iterables[i]);
        }

        return wu.Iterator(function next() {
            var res = iterables[index].next();
            if (isInstance(res, StopIteration)) {
                if (iterables[index + 1] === UNDEF) {
                    return new StopIteration;
                }
                else {
                    index += 1;
                    return arguments.callee();
                }
            }
            else {
                return res;
            }
        });
    };

    wu.compose = function compose(/* variadic number of functions */) {
        var fns = wu.toArray(arguments);
        return function composed() {
            var returnValue = fns.pop().apply(this, arguments);
            while (fns.length) {
                returnValue = fns.pop()(returnValue);
            }
            return returnValue;
        };
    };

    wu.curry = function curry(fn /* variadic number of args */) {
        var args = ARR_SLICE.call(arguments, 1);
        return function curried() {
            return fn.apply(this, args.concat(wu.toArray(arguments)));
        };
    };

    // Equality testing.

    var arrayEq = function arrayEq(a, b) {
        return a.length === 0 ?
            a.length === b.length :
            wu.eq(a[0], b[0]) && wu.eq(a.slice(1),
                                       b.slice(1));
    };

    var objectEq = function objectEq(a, b) {
        var prop, propertiesSeen = [];
        for (prop in a) {
            propertiesSeen.push(prop);
            if ( a.hasOwnProperty(prop) && !wu.eq(a[prop], b[prop]) ) {
                return false;
            }
        }
        for (prop in b) {
            if ( b.hasOwnProperty(prop) &&
                 !wu.has(propertiesSeen, prop) &&
                 !wu.eq(a[prop], b[prop]) ) {
                return false;
            }
        }
        return true;
    };

    var regExpEq = function regExpEq(a, b) {
        return a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline;
    };

    wu.eq = function eq(a, b) {
        var typeOfA = toObjProtoString(a);
        if (typeOfA !== toObjProtoString(b)) {
            return false;
        }

        else {
            switch (typeOfA) {
                case "[object Array]":
                    return arrayEq(a, b);
                case "[object Object]":
                    return objectEq(a, b);
                case "[object RegExp]":
                    return regExpEq(a, b);
                case "[object Date]":
                    return a.valueOf() === b.valueOf();
                default:
                    return a === b;
            }
        }
    };

    wu.filter = function filter(iterable, fn, context) {
        iterable = toIterator(iterable);
        context = context || this;

        return wu.Iterator(function next() {
            var item;
            while ( !isInstance(item, StopIteration) ) {
                item = iterable.next();
                if ( toBool(fn.call(context, item)) ) {
                    return item;
                }
                else {
                    continue;
                }
            }
            return new StopIteration;
        });
    };

    wu.has = function has(iterable, item) {
        return wu.any(iterable, wu.curry(wu.eq, item));
    };

    wu.map = function map(iterable, fn, context) {
        iterable = toIterator(iterable);
        context = context || this;

        var results = [],
            item = iterable.next();

        return wu.Iterator(function next() {
            var result = isInstance(item, StopIteration) ?
                item :
                fn.call(context, item);
            item = iterable.next();
            return result;
        });
    };

    var isMatch = function isMatch(pattern, form) {
        var typeOfForm = toObjProtoString(form),
        typeOfPattern = toObjProtoString(pattern),
        prop;

        if (pattern === wu.match.___) {
            return true;
        }
        if ( typeOfPattern === "[object Function]" ) {
            // Special case for matching instances to their constructors, ie
            // isMatch(Array, [1,2,3]) should return true.
            if (isInstance(form, pattern)) {
                return true;
            }
            // But we have to check String and Number directly since 5
            // instanceof Number and "foo" instanceof String both return false.
            if (pattern === String && typeOfForm === "[object String]") {
                return true;
            }
            if (pattern === Number && typeOfForm === "[object Number]") {
                return true;
            }
            else {
                return form === pattern;
            }
        }
        else {
            if ( typeOfPattern !== typeOfForm ) {
                return false;
            }
            else if ( typeOfPattern === "[object Array]" ) {
                return pattern.length === 0 ?
                    form.length === 0 :
                    isMatch(pattern[0], form[0]) &&
                        isMatch(pattern.slice(1), form.slice(1));
            }
            else if ( typeOfPattern === "[object Object]" ) {
                for (prop in pattern) {
                    if (pattern.hasOwnProperty(prop) &&
                        !isMatch(pattern[prop], form[prop])){
                        return false;
                    }
                }
                return true;
            }
            else {
                return wu.eq(pattern, form);
            }
        }
    };

    wu.match = function match(/* pat1, then1, pat2, then2, ... patN, thenN */) {
        var args = toArray(arguments);
        return function matchFn() {
            var form = toArray(arguments);
            // i += 2 to iterator over only the patterns.
            for (var i = 0; i < args.length; i += 2) {
                if ( isMatch(args[i], form) ) {
                    return toObjProtoString(args[i+1]) === "[object Function]" ?
                        args[i+1].apply(this, form) :
                        args[i+1];
                }
            }
            throw new TypeError("The form did not match any given pattern.");
        };
    };

    // Unique singleton object that will always succeed in matching a form.
    wu.match.___ = {};

    var rangeHelper = function rangeHelper(start, stop, incr) {
        // Handle first case since we are doing +=
        start = start - incr;

        return wu.Iterator(function next() {
            return start + incr >= stop ?
                new wu.StopIteration :
                start += incr;
        });
    };

    wu.range = function range() {
        switch (arguments.length) {
            case 1:
                return rangeHelper(0, arguments[0], 1);
            case 2:
                return rangeHelper(arguments[0], arguments[1], 1);
            case 3:
                return rangeHelper(arguments[0], arguments[1], arguments[2]);
            default:
                throw new TypeError("Wrong number of arguments passed to wu.range!");
        }
    };

    wu.toArray = toArray;

    wu.zip = function zip(iterA, iterB) {
        iterA = toIterator(iterA);
        iterB = toIterator(iterB);
        return wu.Iterator(function next() {
            var a = iterA.next(),
                b = iterB.next(),
                aIsStop = isInstance(a, StopIteration),
                bIsStop = isInstance(b, StopIteration),
                res;
            if (aIsStop && bIsStop) {
                return new StopIteration;
            }
            else {
                res = new Array;
                res[0] = aIsStop ? NULL : a;
                res[1] = bIsStop ? NULL : b;
                return res;
            }
        });
    };

    /**
     * Augmenting functions with wu methods via wu(fn).
     */

    function augmentFunction(fn) {
        fn.all = function all(iterable, context) {
            return wu.all(iterable, this, context);
        };

        fn.any = function any(iterable, context) {
            return wu.any(iterable, this, context);
        };

        fn.bind = function bind(scope) {
            var args = [scope, this].concat(ARR_SLICE.call(arguments, 1));
            return wu.bind.apply(this, args);
        };

        fn.compose = function compose() {
            return wu.compose.apply(this, [this].concat(toArray(arguments)));
        };

        fn.filter = function filter(iterable, context) {
            return wu.filter(iterable, this, context);
        };

        fn.map = function map(iterable, context) {
            return wu.map(iterable, this, context);
        };

        return fn;
    }

    wu.tang = { clan: 36 };

}(window || exports));