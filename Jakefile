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

JAKE.task("clean", function () {
    FILE.remove("wu.min.js");
    FILE.remove("test/wu.tests.min.html");
});

JAKE.task("npm-publish", function () {
    var dirtyIndex = false;
    if ( OS.popen("git status").stdout.read().match(/modified: /) !== null ) {
        dirtyIndex = true;
        OS.system("git stash");
    }

    FILE.remove("./build/google-compiler-20091218.jar");
    OS.system("sudo npm publish .");
    OS.system("git reset --hard");

    if (dirtyIndex) {
        OS.system("git stash pop");
    }
});