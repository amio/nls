#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const padEnd = require('lodash.padend')

function main () {
  const packageDir = path.resolve(process.cwd(), process.argv[2] || '')
  const packageJson = path.resolve(packageDir, 'package.json')
  const pkg = loadJSON(packageJson)

  if (!pkg) {
    console.error(`\n No package.json found in ${chalk.yellow(packageDir)}\n`)
    process.exit(1)
  }

  if (!pkg.scripts) {
    console.info(`\n No ${chalk.bold(scripts)} property in package.json\n`)
    process.exit(0)
  }

  if (!Object.keys(pkg.scripts).length) {
    console.info(`\n No scripts in package.json\n`)
    process.exit(0)
  }

  process.stdout.write(`\n npm scripts in ${chalk.yellow(packageJson)}:\n`)
  printScripts(Object.entries(pkg.scripts))
}

function loadJSON(jsonPath) {
  try {
    return require(jsonPath)
  } catch (e) {}
}

function printScripts(scripts) {
  const maxCommandLength = scripts.reduce((accu, curr) => {
    const len = curr[0].length
    return len > accu ? len : accu
  }, 0)

  scripts.forEach(script => {
    const name = chalk.blue.bold(padEnd(script[0], maxCommandLength))
    const command = script[1]
    process.stdout.write(`\n  - ${name} ${command}`)
  })

  process.stdout.write('\n\n')
}

/**
 * Export & Auto Execute
 */

module.exports = main
require.main === module && main()
