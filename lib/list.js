const path = require('path')
const kleur = require('kleur')
const padEnd = require('lodash.padend')

module.exports = function list () {
  const packageDir = path.resolve(process.cwd(), process.argv[2] || '')
  const packageJson = path.resolve(packageDir, 'package.json')
  const pkg = loadJSON(packageJson)

  if (!pkg) {
    console.error(`\n  No package.json found in ${kleur.yellow(packageDir)}\n`)
    process.exit(1)
  }

  if (!pkg.scripts) {
    console.info(`\n  No ${kleur.bold('scripts')} property in package.json\n`)
    process.exit(0)
  }

  if (!Object.keys(pkg.scripts).length) {
    console.info(`\n  Empty ${kleur.bold('scripts')} in package.json\n`)
    process.exit(0)
  }

  process.stdout.write(`\n  npm scripts in ${kleur.yellow(packageJson)}:\n`)
  printScripts(Object.entries(pkg.scripts))
}

function loadJSON (jsonPath) {
  try {
    return require(jsonPath)
  } catch (e) {}
}

function printScripts (scripts) {
  const maxCommandLength = scripts.reduce((accu, curr) => {
    const len = curr[0].length
    return len > accu ? len : accu
  }, 0)

  scripts.forEach(script => {
    const name = kleur.blue.bold(padEnd(script[0], maxCommandLength))
    const command = script[1]
    process.stdout.write(`\n  * ${name} ${command}`)
  })

  process.stdout.write('\n\n')
}
