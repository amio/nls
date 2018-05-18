const path = require('path')
const execa = require('execa')
const tap = require('tap')

const cwd = path.resolve(__dirname, '..')
const cli = (args, opts) => execa(path.join(cwd, 'lib/nls'), args, opts)

tap.test('runs --version', async t => {
  const packageJson = require(path.join(cwd, 'package.json'))
  const { stdout } = await cli(['--version'], { cwd })
  t.is(stdout, packageJson.version)
})

tap.test('runs in home dir', async t => {
  const { stdout } = await cli([], { cwd })
  t.is(stdout.replace(/npm scripts in .*package.json/, 'npm scripts'), `
  npm scripts:

  * lint    standard
  * pretest npm run lint
  * test    tap test/*.spec.js
`)
})

tap.test('runs `why qs`', async t => {
  const { stdout } = await cli(['why', 'qs'], { cwd })
  t.is(stdout, `
  Who required qs:

  nls > tap > coveralls > request > qs@6.5.2\n`)
})
