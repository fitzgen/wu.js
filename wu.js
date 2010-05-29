(function (globals) {

    /**
     * Maintain local copies of frequently used functions and constants.
     */

    var OLD_WU = globals.wu,
    ARR_SLICE = Array.prototype.slice,
    UNDEF = undefined,
    NULL = null,

    OBJECT_FUNCTION_STR  = "[object Function]",
    OBJECT_ARRAY_STR     = "[object Array]",
    OBJECT_OBJECT_STR    = "[object Object]",
    OBJECT_NODELIST_STR  = "[object NodeList]",
    OBJECT_ARGUMENTS_STR = "[object Arguments]",
    OBJECT_STRING_STR    = "[object String]",
    OBJECT_NUMBER_STR    = "[object Number]",
    OBJECT_REGEXP_STR    = "[object RegExp]",
    OBJECT_DATE_STR      = "[object Date]",

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

    // Given an object obj, return a .next() function that will give items from
    // obj one at a time.
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
            case OBJECT_ARRAY_STR:
                attachNextForArrayLikeObjs.call(this, obj);
                break;
            case OBJECT_NODELIST_STR:
                attachNextForArrayLikeObjs.call(this, obj);
                break;
            case OBJECT_OBJECT_STR:
                if (isInstance(obj, wu.Iterator)) {
                    if (typeof obj.next !== "function") {
                        throw new Error("Iterator without a next method!");
                    }
                    else {
                        NULL;
                    }
                }
                else if (obj.toString() === OBJECT_ARGUMENTS_STR) {
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
            case OBJECT_STRING_STR:
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
            case OBJECT_NUMBER_STR:
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
        if (toObjProtoString(objOrFn) === OBJECT_FUNCTION_STR) {
            this.next = objOrFn;
        }
        else {
            addNextMethod.call(this, objOrFn);
        }

        return UNDEF;
    };

    // Maintain prototype chain for Iterators and exposing prototype as wu.fn
    // for extensibility (following jQuery's lead on that one).
    wu.fn = wu.Iterator.prototype = wu.prototype;

    /*
     * Iterator methods.
     *
     * TODO: reduce, until, dropWhile
     */

    // Return true if fn.call(context, item) is "truthy" for *all* items in this
    // iterator. If fn is not passed, default it to coercion to boolean. Context
    // defaults to this.
    wu.fn.all = function all(fn, context) {
        fn = fn || wu.toBool;
        context = context || this;

        var item = this.next();

        while ( !isInstance(item, wu.StopIteration) ) {
            if ( !fn.call(context, item) ) {
                return false;
            }
            item = this.next();
        }
        return true;
    };

    // Return true if fn.call(context, item) is "truthy" for *any* item in this iterator. If fn
    // is not passed, default it to coercion to boolean. Context defaults to this.
    wu.fn.any = function any(fn, context) {
        var oppositeFn = fn === UNDEF ?
            function oppositeFn(obj) { return !toBool(obj); } :
            function oppositeFn(obj) {
                return !fn.call(context, obj);
            };
        return !this.all(oppositeFn);
    };

    // Access a method or property of each object in this iterable. For example,
    // wu([[1], [2,3], [4,5,6]]).dot("slice", 1).toArray() -> [[], [3], [5,6]]
    wu.fn.dot = function dot(slot /*, and variadic args */) {
        var args = ARR_SLICE.call(arguments, 1),
        that = this;

        return wu.Iterator(function next() {
            console.log("hello");
            var item = that.next();
            if (isInstance(item, StopIteration)) {
                return item;
            }
            else {
                return toObjProtoString(item[slot]) === OBJECT_FUNCTION_STR ?
                    item[slot].apply(item, args) :
                    item[slot];
            }
        });
    };

    // Unlike other iterator methods, each forces evaluation. Runs
    // fn.call(context, item) until all items from the iterator are
    // exhausted. Context defaults to this.
    wu.fn.each = function each(fn, context) {
        context = context || this;
        var item = this.next(),
            results = [];

        while ( !isInstance(item, StopIteration) ) {
            results.push(item);
            fn.call(context, item);
            item = this.next();
        }

        return results;
    };

    // Return an iterator that only returns items from this iterator where
    // fn.call(context, item) returns "truthy". Context defaults to "this".
    wu.fn.filter = function filter(fn, context) {
        var that = this;
        context = context || this;

        return wu.Iterator(function next() {
            var item;
            while ( !isInstance(item, StopIteration) ) {
                item = that.next();
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

    // Force evaluation of this iterator and return it's results as an array.
    wu.fn.force = wu.fn.toArray = function toArray() {
        var item = this.next(), res = [];
        if ( isInstance(item, StopIteration) ) {
            return res;
        }
        else {
            while ( !isInstance(item, StopIteration) ) {
                res.push(item);
                item = this.next();
            }
            return res;
        }
    };

    // Return true if item is inside this iterable.
    wu.fn.has = function has(item) {
        return this.any(wu.curry(wu.eq, item));
    };

    // Return a new iterator where it returns the result of fn.call(context,
    // item) for each item in this iterator. Context defaults to this.
    wu.fn.map = function map(fn, context) {
        var that = this;
        context = context || this;

        return wu.Iterator(function next() {
            var next = that.next();
            return isInstance(next, StopIteration) ?
                next :
                fn.call(context, next);
        });
    };

    // Same as wu.fn.map except that the items in this iterable are assumed to
    // be arrays and the resulting iterator calls fn.apply(context, item) rather
    // than fn.call(context, item). Context defaults to this.
    wu.fn.mapply = function mapply(fn, context) {
        var that = this;
        context = context || this;

        return wu.Iterator(function next() {
            var next = that.next();
            return isInstance(next, StopIteration) ?
                next :
                fn.apply(context, next);
        });
    };

    // Continue iterating items while fn.call(context, item) is "truthy". As
    // soon as it isn't truthy, stop iterating altogether. Context defaults to
    // this.
    wu.fn.takeWhile = function takeWhile(fn, context) {
        var keepIterating = true,
        that = this;
        context = context || this;

        return wu.Iterator(function next() {
            var result;
            if (keepIterating) {
                result = that.next();
                if ( toBool(fn.call(context, result)) ) {
                    return result;
                }
                else {
                    keepIterating = false;
                }
            }
            return new StopIteration;
        });
    };

    /**
     * Functions attached to wu directly.
     *
     * MAYBE: lambda, partial, tee, sort
     */

    wu.bind = function bind(scope, fn /*, variadic number of arguments */) {
        var args = ARR_SLICE.call(arguments, 2);
        return function bound() {
            return fn.apply(scope, args.concat(wu.toArray(arguments)));
        };
    };

    // Chain this iterable with the iterable arguments. For example,
    // wu.chain([1,2,3], [4,5]) is essentially the same as wu([1,2,3,4,5]).
    wu.chain = function chain(/* variadic iterables */) {
        var i,
        index = 0,
        iterables = toArray(arguments);

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

    wu.cycle = function cycle(iterable) {
        var items = toArray(iterable), len = items.length, index = 0;

        return wu.Iterator(function next() {
            return items[(index++) % len];
        });
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
                 !wu(propertiesSeen).has(prop) &&
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
                case OBJECT_ARRAY_STR:
                    return arrayEq(a, b);
                case OBJECT_OBJECT_STR:
                    return objectEq(a, b);
                case OBJECT_REGEXP_STR:
                    return regExpEq(a, b);
                case OBJECT_DATE_STR:
                    return a.valueOf() === b.valueOf();
                default:
                    return a === b;
            }
        }
    };

    var isMatch = function isMatch(pattern, form) {
        var typeOfForm = toObjProtoString(form),
        typeOfPattern = toObjProtoString(pattern),
        prop;

        if (pattern === wu.match.___) {
            return true;
        }
        if ( typeOfPattern === OBJECT_FUNCTION_STR ) {
            // Special case for matching instances to their constructors, ie
            // isMatch(Array, [1,2,3]) should return true.
            if (isInstance(form, pattern)) {
                return true;
            }
            // But we have to check String and Number directly since 5
            // instanceof Number and "foo" instanceof String both return false.
            if (pattern === String && typeOfForm === OBJECT_STRING_STR) {
                return true;
            }
            if (pattern === Number && typeOfForm === OBJECT_NUMBER_STR) {
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
            else if ( typeOfPattern === OBJECT_ARRAY_STR ) {
                return pattern.length === 0 ?
                    form.length === 0 :
                    isMatch(pattern[0], form[0]) &&
                        isMatch(pattern.slice(1), form.slice(1));
            }
            else if ( typeOfPattern === OBJECT_OBJECT_STR ) {
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
                    return toObjProtoString(args[i+1]) === OBJECT_FUNCTION_STR ?
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

    wu.toBool = toBool;
    wu.toArray = toArray;

    wu.zip = function zip(iterA, iterB) {
        iterA = toIterator(iterA);
        iterB = toIterator(iterB);
        return wu.Iterator(function next() {
            var a = iterA.next(),
                b = iterB.next(),
                aIsStop = isInstance(a, StopIteration),
                bIsStop = isInstance(b, StopIteration);
            if (aIsStop || bIsStop) {
                return new StopIteration;
            }
            else {
                return [a, b];
            }
        });
    };

    /**
     * Augmenting functions with wu methods via wu(fn).
     */

    function augmentFunction(fn) {
        fn.bind = function bind(scope) {
            var args = [scope, this].concat(ARR_SLICE.call(arguments, 1));
            return wu.bind.apply(this, args);
        };

        fn.compose = function compose() {
            return wu.compose.apply(this, [this].concat(toArray(arguments)));
        };

        fn.curry = function curry() {
            return wu.curry.apply(this, [this].concat(toArray(arguments)));
        };

        return fn;
    }

    wu.tang = { clan: 36 };

}(window || exports));