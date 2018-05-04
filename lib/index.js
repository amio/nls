#!/usr/bin/env node

const mri = require('mri')
const chalk = require('chalk')
const list = require('./list.js')
const why = require('npm-why/cli-main.js')

const help = `
  ${chalk.bold('nls')} - List npm scripts & deps

  Usage

    $ nls [<target-dir> | -w <package-name> | -h | -v]

  Examples

    # List npm scripts in current dir
    $ ${chalk.green('nls')}

    # List npm scripts in "node_modules/chalk"
    $ ${chalk.green('nls node_modules/chalk')}

    # Find who depend upon package 'chalk'.
    $ ${chalk.green('nls -w chalk')}
`

const args = mri(process.argv.slice(2), {
  boolean: ['help', 'version', 'why'],
  alias: {
    h: 'help',
    v: 'version',
    w: 'why'
  }
})

if (args.help) {
  console.info(help)
} else if (args.version) {
  console.info(require('../package.json').version)
} else if (args.why && args._.length === 1) {
  why(process.cwd(), args._[0])
} else {
  list()
}
