import path from 'path'
import { execa } from 'execa'
import { test } from 'node:test'
import assert from 'node:assert'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const cwd = path.resolve(__dirname, '..')
const packageJson = require(path.join(cwd, 'package.json'))
const cli = (args, opts) => execa('node', [path.join(cwd, 'lib/nls.js'), ...args], {
  ...opts,
  env: {
    ...opts?.env,
    FORCE_COLOR: '0'
  }
})

test('runs --version', async () => {
  const { stdout } = await cli(['--version'], { cwd })
  assert.strictEqual(stdout, packageJson.version, 'output version.')
})

test('runs in root dir', async () => {
  const { stdout } = await cli([], { cwd })
  assert.match(stdout, /npm scripts/)
  assert.match(stdout, /lint/)
  assert.match(stdout, /test/)
})

test('runs `why marked`', async () => {
  const { stdout } = await cli(['why', 'marked'], { cwd })
  assert.match(stdout, /marked/)
  assert.match(stdout, /Who required marked/)
})

test('runs `v` in root', async () => {
  const { stdout } = await cli(['v'], { cwd })
  assert.strictEqual(stdout, packageJson.version)
})
