import path from 'path'
import { execa } from 'execa'
import { test } from 'tap'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const cwd = path.resolve(__dirname, '..')
const packageJson = require(path.join(cwd, 'package.json'))
const cli = (args, opts) => execa('node', [path.join(cwd, 'lib/nls.js'), ...args], opts)

test('runs --version', async t => {
  const { stdout } = await cli(['--version'], { cwd })
  t.equal(stdout, packageJson.version, 'output version.')
})

test('runs in root dir', async t => {
  const { stdout } = await cli([], { cwd })
  const purged = stdout.replace(/npm scripts in .*package.json/, 'npm scripts')
  t.matchSnapshot(purged, 'snapshot')
})

test('runs `why qs`', async t => {
  const { stdout } = await cli(['why', 'qs'], { cwd })
  t.matchSnapshot(stdout, 'snapshot')
})

test('runs `v` in root', async t => {
  const { stdout } = await cli(['v'], { cwd })
  t.equal(stdout, packageJson.version)
})
