const path = require('path')
const kleur = require('kleur')
const padEnd = require('lodash.padend')
const { loadPackageJson } = require('./utils')

module.exports = function list (cwd) {
  const pkg = loadPackageJson(cwd)

  if (!pkg.scripts) {
    return console.info(`\n  No ${kleur.bold('scripts')} property in package.json\n`)
  }

  if (!Object.keys(pkg.scripts).length) {
    return console.info(`\n  Empty ${kleur.bold('scripts')} in package.json\n`)
  }

  process.stdout.write(`\n  npm scripts in ${kleur.yellow(cwd + '/package.json')}:\n`)
  printScripts(Object.entries(pkg.scripts))
}

function printScripts (scripts) {
  const maxCommandLength = scripts.reduce((accu, curr) => {
    const len = curr[0].length
    return len > accu ? len : accu
  }, 0)

  scripts.forEach(script => {
    const name = kleur.blue().bold(padEnd(script[0], maxCommandLength))
    const command = script[1]
    process.stdout.write(`\n  * ${name} ${command}`)
  })

  process.stdout.write('\n\n')
}
