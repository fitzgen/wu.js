var JAKE = require("jake");
var OS = require("os");
var FILE = require("file");

JAKE.task("minify", function () {
    OS.system("java -jar build/google-compiler-20091218.jar --js lib/wu.js > wu.min.js");
});

JAKE.task("test-min", ["minify"], function () {
    var f = FILE.open("test/wu.tests.min.html", "w");
    f.write(
        FILE.open("test/wu.tests.html", "r")
            .read()
            .replace("../lib/wu.js", "../wu.min.js")
    );
    f.close();
});