#!/usr/bin/env bash

set -e

cd `dirname $0`

# Make sure all dependencies are installed.
npm install

TRACEUR="./node_modules/traceur/traceur"
TRACEUR_RUNTIME="./node_modules/traceur/bin/traceur-runtime.js"

# Compile wu.js itself to ES5.
$TRACEUR                            \
    --experimental                  \
    --modules=inline                \
    --sourcemap                     \
    --out wu.es5.js                 \
    wu.js

cp $TRACEUR_RUNTIME traceur-runtime.js

# Compile all tests to ES5 and put them into the the "test-es5" directory.
$TRACEUR                            \
    --experimental                  \
    --modules=commonjs              \
    --sourcemap                     \
    --dir test/ test-es5/

# Copy the test page, remove the JS version 1.8 declaration, and load the es5
# version of wu.js instead of the normal version.
cp test/test.html test-es5/test.html
sed -i'' -e 's/;version=1.8//g'              test-es5/test.html
sed -i'' -e 's/ES6 version/ES5 version/g'    test-es5/test.html
sed -i'' -e 's/\.\.\/wu\.js/..\/wu.es5.js/g' test-es5/test.html

# Remove comments, which adds the traceur-runtime.js script tag to the page.
sed -i'' -e 's/<!\-\-//g'                    test-es5/test.html
sed -i'' -e 's/\-\->//g'                     test-es5/test.html

# For some reason this file gets generated. *shrug*
rm test-es5/test.html-e

echo "OK"
