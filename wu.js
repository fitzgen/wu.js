(function (globals) {

    var oldWu = globals.wu,
    arrSlice = Array.prototype.slice,
    objToString = Object.prototype.toString,
    /*arrConcat = Array.prototype.concat,*/
    wu = globals.wu = function wu(fn) {
        return init(fn);
    };

    wu.noConflict = function noConflict() {
        globals.wu = oldWu;
        return wu;
    };

    wu.toArray = function toArray(obj) {
        return arrSlice.call(obj);
    };

    wu.toBool = function toBool(obj) {
        return !!obj;
    };

    /**
     * Iterators!
     */

    wu.StopIteration = function () {};

    var iteratorCreator = function iterHelper(obj) {
        var pairs, prop, len, chr;
                
        if (obj instanceof Array) {
            this.next = function () {
                return obj.length > 0 ?
                    obj.shift() :
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
        return undefined;
    };

    /**
     * Functions that are also methods for wu functions.
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

    function init(fn) {
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