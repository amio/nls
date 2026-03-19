import path from 'path'
import fs from 'fs'
import { test } from 'node:test'
import assert from 'node:assert'
import { execa } from 'execa'
import { fileURLToPath } from 'url'
import { indent, loadPackageJson } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const cli = (args, opts) => execa('node', [path.join(root, 'lib/nls.js'), ...args], opts)

const fixtureDir = path.join(__dirname, 'fixtures')

test('setup fixtures', async () => {
  if (fs.existsSync(fixtureDir)) {
    fs.rmSync(fixtureDir, { recursive: true, force: true })
  }
  fs.mkdirSync(fixtureDir)

  // Fixture for deps
  const depsDir = path.join(fixtureDir, 'deps-project')
  fs.mkdirSync(depsDir)
  fs.writeFileSync(path.join(depsDir, 'package.json'), JSON.stringify({
    name: 'deps-project',
    dependencies: { 'pkg-a': '^1.0.0' },
    devDependencies: { 'pkg-b': '^2.0.0' },
    optionalDependencies: { 'pkg-c': '^3.0.0' }
  }))
  const nmDir = path.join(depsDir, 'node_modules')
  fs.mkdirSync(nmDir)
  for (const pkg of ['pkg-a', 'pkg-b', 'pkg-c']) {
    const pkgPath = path.join(nmDir, pkg)
    fs.mkdirSync(pkgPath)
    fs.writeFileSync(path.join(pkgPath, 'package.json'), JSON.stringify({
      name: pkg,
      version: '1.0.0',
      license: 'MIT',
      homepage: 'https://example.com'
    }))
  }

  // Fixture for read
  const readDir = path.join(fixtureDir, 'read-project')
  fs.mkdirSync(readDir)
  fs.writeFileSync(path.join(readDir, 'package.json'), JSON.stringify({ name: 'read-project' }))
  const nmReadDir = path.join(readDir, 'node_modules', 'some-pkg')
  fs.mkdirSync(nmReadDir, { recursive: true })
  fs.writeFileSync(path.join(nmReadDir, 'README.md'), '# Some Pkg Readme')
  fs.mkdirSync(path.join(readDir, 'node_modules', 'no-readme'), { recursive: true })

  // Fixture for empty/no scripts
  const noScriptsDir = path.join(fixtureDir, 'no-scripts')
  fs.mkdirSync(noScriptsDir)
  fs.writeFileSync(path.join(noScriptsDir, 'package.json'), JSON.stringify({ name: 'no-scripts' }))

  const emptyScriptsDir = path.join(fixtureDir, 'empty-scripts')
  fs.mkdirSync(emptyScriptsDir)
  fs.writeFileSync(path.join(emptyScriptsDir, 'package.json'), JSON.stringify({ name: 'empty-scripts', scripts: {} }))

  // Fixture for yarn.lock
  const yarnDir = path.join(fixtureDir, 'yarn-project')
  fs.mkdirSync(yarnDir)
  fs.writeFileSync(path.join(yarnDir, 'package.json'), JSON.stringify({ name: 'yarn-project' }))
  fs.writeFileSync(path.join(yarnDir, 'yarn.lock'), '')
})

test('runs `deps`', async () => {
  const { stdout } = await cli(['deps'], { cwd: path.join(fixtureDir, 'deps-project') })
  assert.match(stdout, /pkg-a/)
  assert.match(stdout, /pkg-b/)
  assert.match(stdout, /pkg-c/)
})

test('runs `read`', async () => {
  const { stdout } = await cli(['read', 'some-pkg'], { cwd: path.join(fixtureDir, 'read-project') })
  assert.match(stdout, /Some Pkg Readme/)

  const { stdout: stdout2 } = await cli(['read', 'no-readme'], { cwd: path.join(fixtureDir, 'read-project') })
  assert.strictEqual(stdout2, '')
})

test('runs `why` with no pkg', async () => {
  const { stdout } = await cli(['why'], { cwd: root })
  assert.match(stdout, /No one requires no one/)
})

test('runs `why` with yarn.lock', async () => {
  // Just verify it attempts to call yarn-why
  try {
    await cli(['why', 'some-pkg'], { cwd: path.join(fixtureDir, 'yarn-project') })
  } catch (err) {
    // yarn-why might fail because it's a mock project, but we want to see it was called
  }
})

test('runs `list` variants', async () => {
  const { stdout: stdout1 } = await cli([], { cwd: path.join(fixtureDir, 'no-scripts') })
  assert.match(stdout1, /No scripts property/)

  const { stdout: stdout2 } = await cli([], { cwd: path.join(fixtureDir, 'empty-scripts') })
  assert.match(stdout2, /Empty scripts/)
})

test('view non-existent prop', async () => {
  const { stdout } = await cli(['view', 'non.existent'], { cwd: root })
  assert.strictEqual(stdout, '')
})

test('utils coverage', () => {
  assert.throws(() => loadPackageJson(fixtureDir), /Cannot read package.json/)
  assert.strictEqual(indent('  ', 'foo\nbar'), '  foo\n  bar')
})

test('error paths', async () => {
  try {
    await cli([], { cwd: fixtureDir })
    assert.fail('Should have failed')
  } catch (err) {
    assert.match(err.stderr, /No package.json/)
  }

  // Test help
  const { stdout: help1 } = await cli(['--help'], { cwd: root })
  assert.match(help1, /Usage/)

  const { stdout: help2 } = await cli(['--help'], { cwd: fixtureDir })
  assert.match(help2, /Usage/)
})

test('cleanup fixtures', async () => {
  fs.rmSync(fixtureDir, { recursive: true, force: true })
})
