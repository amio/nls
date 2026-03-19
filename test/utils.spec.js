import { readObject } from '../lib/utils.js'
import { test } from 'node:test'
import assert from 'node:assert'

test('readObject()', () => {
  const obj = { foo: { bar: 'baz' } }
  assert.strictEqual(readObject(obj, 'foo.bar'), 'baz', 'read foo.bar')
  assert.strictEqual(readObject(obj, 'foo.qux'), undefined, 'read overflow path')
  assert.strictEqual(readObject(obj, 'foo.qux', 'default'), 'default', 'read undefined value')
})
