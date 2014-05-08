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
  assert.deepEqual(expected, [...actual]);
};

mocha.setup('bdd');
