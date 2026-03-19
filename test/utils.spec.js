import { readObject } from '../lib/utils.js'
import { test } from 'tap'

test('readObject()', t => {
  const obj = { foo: { bar: 'baz' } }
  t.equal(readObject(obj, 'foo.bar'), 'baz', 'read foo.bar')
  t.equal(readObject(obj, 'foo.qux'), undefined, 'read overflow path')
  t.equal(readObject(obj, 'foo.qux', 'default'), 'default', 'read undefined value')
  t.end()
})
