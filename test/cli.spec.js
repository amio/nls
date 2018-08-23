const path = require('path')
const execa = require('execa')
const tap = require('tap')

const cwd = path.resolve(__dirname, '..')
const cli = (args, opts) => execa(path.join(cwd, 'lib/nls'), args, opts)

tap.test('runs --version', async t => {
  const packageJson = require(path.join(cwd, 'package.json'))
  const { stdout } = await cli(['--version'], { cwd })
  t.is(stdout, packageJson.version, 'output version.')
})

tap.test('runs in home dir', async t => {
  const { stdout } = await cli([], { cwd })
  const purged = stdout.replace(/npm scripts in .*package.json/, 'npm scripts')
  t.matchSnapshot(purged, 'snapshot')
})

tap.test('runs `why qs`', async t => {
  const { stdout } = await cli(['why', 'qs'], { cwd })
  t.matchSnapshot(stdout, 'snapshot')
})
