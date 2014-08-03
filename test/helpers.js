window.assert = chai.assert;

// Helper for asserting that all the elements yielded from the |actual|
// iterator are in the |expected| set.
assert.eqSet = (expected, actual) => {
  for (var x of actual) {
    assert.ok(expected.has(x));
    expected.delete(x);
  }
};

// Helper for asserting that all the elements yielded from the |actual|
// iterator are equal to and in the same order as the elements of the
// |expected| array.
assert.eqArray = (expected, actual) => {
  // assert.deepEqual(expected, [...actual]);
  var i = 0;
  for (var x of actual) {
    assert.deepEqual(expected[i++], x);
  }
};

// Get an iterator for the given thing.
window.iter = thing => {
  if (!thing[wu.iteratorSymbol] || typeof thing[wu.iteratorSymbol] !== "function") {
    throw new Error("`" + thing + "` is not iterable!");
  }
  return thing[wu.iteratorSymbol]();
}

mocha.setup('bdd');
