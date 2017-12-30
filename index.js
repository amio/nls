#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const padEnd = require('string.prototype.padend')

const pkg = loadPackageConfig(process.cwd())

if (!pkg) {
  console.error('\n No package.json in current directory\n')
  process.exit(1)
}

if (!pkg.scripts) {
  console.info(`\n No ${chalk.bold(scripts)} field in package.json\n`)
  process.exit(0)
}

if (!Object.keys(pkg.scripts).length) {
  console.info(`\n No scripts in package.json\n`)
  process.exit(0)
}

printScripts(Object.entries(pkg.scripts))

function loadPackageConfig(cwd) {
  try {
    return require(path.join(cwd, 'package.json'))
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
    process.stdout.write(`\n - ${name} ${command}`)
  })

  process.stdout.write('\n\n')
}
