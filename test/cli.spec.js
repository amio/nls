import path from 'path'
import { execa } from 'execa'
import { test } from 'node:test'
import assert from 'node:assert'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const cwd = path.resolve(__dirname, '..')
const packageJson = require(path.join(cwd, 'package.json'))
const cli = (args, opts) => execa('node', [path.join(cwd, 'lib/nls.js'), ...args], opts)

// Simple snapshot-like matching
function matchSnapshot (actual, snapshotName) {
  const snapshotPath = path.join(__dirname, 'snapshots', `cli.spec.js.${snapshotName}.txt`)
  if (process.env.UPDATE_SNAPSHOTS || !fs.existsSync(snapshotPath)) {
    fs.mkdirSync(path.dirname(snapshotPath), { recursive: true })
    fs.writeFileSync(snapshotPath, actual)
    return
  }
  const expected = fs.readFileSync(snapshotPath, 'utf8')
  assert.strictEqual(actual, expected)
}

test('runs --version', async () => {
  const { stdout } = await cli(['--version'], { cwd })
  assert.strictEqual(stdout, packageJson.version, 'output version.')
})

test('runs in root dir', async () => {
  const { stdout } = await cli([], { cwd })
  const purged = stdout.replace(/npm scripts in .*package.json/, 'npm scripts')
  matchSnapshot(purged, 'root-dir')
})

test('runs `why qs`', async () => {
  const { stdout } = await cli(['why', 'qs'], { cwd })
  matchSnapshot(stdout, 'why-qs')
})

test('runs `v` in root', async () => {
  const { stdout } = await cli(['v'], { cwd })
  assert.strictEqual(stdout, packageJson.version)
})
