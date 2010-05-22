(function (globals) {

    /**
     * Maintain local copies of frequently used functions and constants.
     */

    var OLD_WU = globals.wu,
    ARR_SLICE = Array.prototype.slice,
    OBJ_TO_STRING = Object.prototype.toString,
    UNDEF = undefined,
    /*arrConcat = Array.prototype.concat,*/

    /**
     * Define publicly exposed wu function.
     */

    wu = globals.wu = function wu(fn) {
        return fn instanceof Function ?
            augmentFunction(fn) :
            wu.Iterator(fn);
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
    };

    var toArray = wu.toArray = function toArray(obj) {
        return isInstance(obj, wu.Iterator) ?
            obj.toArray() :
            ARR_SLICE.call(obj);
    };

    var toIterator = function (obj) {
        return isInstance(obj, wu.Iterator) ?
            obj :
            new wu.Iterator(obj);
    };

    var toBool = wu.toBool = function toBool(obj) {
        return !!obj;
    };

    /**
     * Iterators!
     */

    var StopIteration = wu.StopIteration = function () {};

    var addNextMethod = function iterHelper(obj) {
        var pairs, prop, len, chr, items;

        if (isInstance(obj, Array)) {
            // Copy obj to items so that .shift() won't have side effects on
            // original.
            items = wu.toArray(obj);
            this.next = function () {
                return items.length > 0 ?
                    items.shift() :
                    new wu.StopIteration;
            };
        }

        else if (isInstance(obj, Object) && (isInstance(obj, wu.Iterator) !== true)) {
            pairs = [];
            for (prop in obj)
                if (obj.hasOwnProperty(prop))
                    pairs.push([prop, obj[prop]]);

            addNextMethod.call(this, pairs);
        }

        else if (OBJ_TO_STRING.call(obj) === "[object String]") {
            len = obj.length;
            this.next = function () {
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
        }

        else if (isInstance(obj, wu.Iterator)) {
            // Pass
        }

        else {
            throw new TypeError("Object is not iterable: " + obj);
        }
    };

    wu.Iterator = function Iterator(obj) {
        if (isInstance(this, wu.Iterator) === false)
            return new wu.Iterator(obj);

        if (obj !== UNDEF)
            addNextMethod.call(this, obj);

        this.toArray = this.toArray || function toArray() {
            var item = this.next(),
                res = [];
            while ( !isInstance(item, wu.StopIteration) ) {
                res.push(item);
                item = this.next();
            }
            return res;
        };

        // Attach more helper methods to iterators.

        return UNDEF;
    };

    // Maintain prototype chain for Iterators.
    wu.Iterator.prototype = wu.prototype;

    /**
     * Iterating helper functions.
     */

    wu.all = function all(iterable, fn, context) {
        iterable = toIterator(iterable);
        fn = fn || wu.toBool;
        context = context || this;

        var item = iterable.next();

        while ( !isInstance(item, wu.StopIteration) ) {
            if ( !fn.call(context, item) )
                return false;
            item = iterable.next();
        }
        return true;
    };

    wu.any = function any(iterable, fn, context) {
        var oppositeFn = fn === UNDEF ?
            function (obj) { return !toBool(obj); } :
            function (obj) {
                return !fn.call(context, obj);
            };
        return !wu.all(iterable, oppositeFn);
    };

    var rangeHelper = function rangeHelper(start, stop, incr) {
        var iterator = new wu.Iterator;

        // Handle first case since we are doing +=
        start = start - incr;

        iterator.next = function () {
            return start + incr >= stop ?
                new wu.StopIteration :
                start += incr;
        };

        return iterator;
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

    /**
     * Functions that are also methods (in some form) for wu functions.
     */

    wu.bind = function bind(scope, fn /*, variadic number of arguments */) {
        var args = ARR_SLICE(arguments, 2);
        return function () {
            return fn.apply(scope, args.concat(arguments));
        };
    };

    wu.compose = function compose(/* variadic number of functions */) {
        var fns = wu.toArray(arguments);
        return function () {
            var returnValue = fns.pop().apply(this, arguments);
            while (fns.length) {
                returnValue = fns.pop()(returnValue);
            }
            return returnValue;
        };
    };

    /**
     * Augmentation of functions with wu methods.
     */

    function augmentFunction(fn) {
        fn.all = function all(iterable, context) {
            return wu.all(iterable, this, context);
        };

        fn.any = function any(iterable, context) {
            return wu.any(iterable, this, context);
        };

        fn.bind = function bind(scope) {
            return wu.bind.apply(
                scope,
                [this].concat(ARR_SLICE.call(arguments, 1))
            );
        };

        fn.compose = function compose() {
            return wu.compose.apply(this, [this].concat(arguments));
        };

        return fn;
    }

    wu.tang = { clan: 36 };

}(window || exports));