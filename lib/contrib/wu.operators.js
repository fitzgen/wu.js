// ## Wu.js operators extension
//
// This extension to Wu.js provides the most common Javascript operators as
// self-currying functions. The operators live under the `wu.op` namespace, for
// example you could access the `&&` operator either as `wu.op.and` or as
// `wu.op["&&"]`. All of the operator functions are available in both literal (`wu.op["&&"]`)
// and english (`wu.op.and`) styles.

// This file relies on wu as a dependency.
//
// TODO: How to handle CommonJS support?
if (typeof wu !== "function") {
    throw new Error("wu.operators.js: `wu` is required");
}


(function (wu, op) {

    // ### Arithmetic Operators

    op["+"] = op.add = wu.autoCurry(function (a, b) {
        return a + b;
    });

    op["-"] = op.sub = wu.autoCurry(function (a, b) {
        return a - b;
    });

    op["*"] = op.mul = wu.autoCurry(function (a, b) {
        return a * b;
    });

    op["/"] = op.div = wu.autoCurry(function (a, b) {
        return a / b;
    });

    op["%"] = op.mod = wu.autoCurry(function (a, b) {
        return a % b;
    });

    // ### Logic Operators

    op["&&"] = op.and = wu.autoCurry(function (a, b) {
        return a && b;
    });

    op["||"] = op.or = wu.autoCurry(function (a, b) {
        return a || b;
    });

    op["=="] = op.eq = wu.autoCurry(function (a, b) {
        return a == b;
    });

    op["!="] = op.neq = wu.autoCurry(function (a, b) {
        return a != b;
    });

    op["==="] = op.is = wu.autoCurry(function (a, b) {
        return a === b;
    });

    op["!=="] = op.isnt = wu.autoCurry(function (a, b) {
        return a !== b;
    });

    op["<"] = op.lt = wu.autoCurry(function (a, b) {
        return a < b;
    });

    op["<"] = op.gt = wu.autoCurry(function (a, b) {
        return a < b;
    });

    op["<="] = op.lte = wu.autoCurry(function (a, b) {
        return a <= b;
    });

    op[">="] = op.gte = wu.autoCurry(function (a, b) {
        return a >= b;
    });

    op["in"] = op.in_ = wu.autoCurry(function (a, b) {
        return a in b;
    });

    op["!"] = op.not = function (a) {
        return !a;
    };

    // ### Misc. Operators

    op["typeof"] = op.typeof_ = function (a) {
        return typeof a;
    };

    op["instanceof"] = op.instanceof_ = wu.autoCurry(function (a, b) {
        return a instanceof b;
    });

    op["?"] = op.ternary = wu.autoCurry(function (a, b, c) {
        return a ? b : c;
    });

}(wu, wu.op = {}));