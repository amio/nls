#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const padEnd = require('string.prototype.padend')

const pkg = loadPackageConfig(process.cwd())

if (!pkg) {
    console.error('No package.json found')
    process.exit(1)
}

if (Object.keys(pkg.scripts).length) {
    printScripts(Object.entries(pkg.scripts))
} else {
    console.info('No scripts in package.json')
}

function loadPackageConfig (cwd) {
    try {
        return require(path.join(cwd, 'package.json'))
    } catch (e) {
        const parentDir = path.resolve(cwd, '..')
        if (parentDir !== cwd) {
            return loadPackageConfig(path.resolve(cwd, '..'))
        }
    }
}

function printScripts (scripts) {
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
