(function (globals) {

    var oldWu = globals.wu,
    arrSlice = Array.prototype.slice,
    objToString = Object.prototype.toString,
    /*arrConcat = Array.prototype.concat,*/
    wu = globals.wu = function wu(fn) {
        return augmentFunction(fn);
    };

    wu.noConflict = function noConflict() {
        globals.wu = oldWu;
        return wu;
    };

    wu.toArray = function toArray(obj) {
        return obj instanceof wu.Iterator ?
            obj.toArray() :
            arrSlice.call(obj);
    };

    wu.toBool = function toBool(obj) {
        return !!obj;
    };

    /**
     * Iterators!
     */

    wu.StopIteration = function () {};

    var iteratorCreator = function iterHelper(obj) {
        var pairs, prop, len, chr, items;

        if (obj instanceof Array) {
            // Copy obj to items so that .shift() won't have side effects on
            // original.
            items = toArray(obj);
            this.next = function () {
                return items.length > 0 ?
                    items.shift() :
                    new wu.StopIteration;
            };
        }

        else if (obj instanceof Object && (obj instanceof wu.Iterator !== true)) {
            pairs = [];
            for (prop in obj)
                if (obj.hasOwnProperty(prop))
                    pairs.push([prop, obj[prop]]);

            iteratorCreator.call(this, pairs);
        }

        else if (objToString.call(obj) === "[object String]") {
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

        else if (obj instanceof wu.Iterator) {
            // Pass
        }

        else {
            throw new TypeError("Object is not iterable: " + obj);
        }
    };

    wu.Iterator = function Iterator(obj) {
        if (this instanceof wu.Iterator === false)
            return new wu.Iterator(obj);

        if (obj !== undefined)
            iteratorCreator.call(this, obj);

        this.toArray = this.toArray || function toArray() {
            var item = this.next(),
                res = [];
            while ( !(item instanceof wu.StopIteration) ) {
                res.push(item);
                item = this.next();
            }
            return res;
        };

        // Attach more helper methods to iterators.

        return undefined;
    };

    /**
     * Iterating helper functions.
     */

    wu.all = function all(iterable, fn, context) {
        iterable = wu.Iterator(iterable);
        fn = fn || wu.toBool;
        context = context || this;

        var item = iterable.next();

        while ( !(item instanceof wu.StopIteration) ) {
            if ( !fn.call(context, item) )
                return false;
            item = iterable.next();
        }
        return true;
    };

    wu.any = function any(iterable, fn, context) {
        var oppositeFn = fn === undefined ?
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
        var args = arrSlice(arguments, 2);
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
                [this].concat(arrSlice.call(arguments, 1))
            );
        };

        fn.compose = function compose() {
            return wu.compose.apply(this, [this].concat(arguments));
        };

        return fn;
    }

    wu.tang = { clan: 36 };

}(window || exports));