const wu = require('../wu');
const assert = require('../assert');
describe('wu.join', () => {
  it('should join the iterable with default separator', () => {
    const native = [1,2,3].join();
    assert.equal(native, wu([1,2,3]).join());
  });

  it('should accept user desired separator', () => {
    const native = [1,2,3].join(', ');
    assert.equal(native, wu([1,2,3]).join(', '));
  });

  it('should replace nulls with blank', () => {
    const native = [1,null,3].join();
    assert.equal(native, wu([1,null,3]).join());
  });

  it('should replace undefined with blank', () => {
    const native = [1,undefined,3].join();
    assert.equal(native, wu([1, undefined, 3]).join());
  });

  it('should be curryable', () => {
    const native = [1,2,3].join();
    assert.equal(native, wu.join(',')([1,2,3]));
  });
});
