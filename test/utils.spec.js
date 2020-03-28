const tap = require('tap')
const { readObject } = require('../lib/utils')

tap.test('readObject()', async t => {
  const obj = { foo: { bar: 'eiyo' } }

  t.is(readObject(obj, 'foo.bar'), 'eiyo', 'read foo.bar')
  t.is(readObject(obj, 'foo.bar.eiyo'), undefined, 'read overflow path')
  t.is(readObject(obj, 'foobar.eiyo'), undefined, 'read undefined value')
})
