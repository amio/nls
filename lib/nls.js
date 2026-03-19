#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import kleur from 'kleur'
import mri from 'mri'
import { createRequire } from 'module'

import list from './list.js'
import read from './read.js'
import view from './view.js'
import deps from './deps.js'
import why from './why.js'

const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

const nlsVersion = () => kleur.dim(`(v${packageJson.version})`)

const helpText = `
  ${kleur.bold('nls')}${nlsVersion()} - Missing inspector for npm packages.

  Usage

    $ nls                     ${kleur.dim('List available npm scripts')}
    $ nls deps                ${kleur.dim('List dependencies table (d for short)')}
    $ nls view [prop-path]    ${kleur.dim('Extract info from package.json (v for short)')}
    $ nls read <package-name> ${kleur.dim('Print readme file from a dependency (r for short)')}
    $ nls why <package-name>  ${kleur.dim('Identify why a package has been installed (w for short)')}

  Options

    -d, --dir       ${kleur.dim('Target directory')}
    -h, --help      ${kleur.dim('Output usage information')}
    -v, --version   ${kleur.dim('Output the version number')}

  Examples

    # List npm scripts in current dir
    $ ${kleur.green('nls')}

    # List who depend upon package 'chalk'
    $ ${kleur.green('nls why chalk')}

    # Output package version
    $ ${kleur.green('nls v version')}
`

const args = mri(process.argv.slice(2), {
  boolean: ['dir', 'help', 'version'],
  alias: {
    d: 'dir',
    h: 'help',
    v: 'version'
  }
})

main(args).catch(err => {
  process.exitCode = 1
  process.stderr.write(kleur.dim(`nls${nlsVersion()}: `))
  console.error(createErrorMessage(err))
})

async function main ({ dir, help, version, _: rest }) {
  if (help) {
    return console.info(helpText)
  }

  if (version) {
    return console.info(packageJson.version)
  }

  const cwd = dir ? path.join(process.cwd(), dir) : process.cwd()
  await checkDirPkg(cwd)

  const [command, ...params] = rest
  switch (command) {
    case 'w':
    case 'why':
      return why(cwd, ...params)
    case 'r':
    case 'read':
      return read(cwd, ...params)
    case 'v':
    case 'view':
      return view(cwd, ...params)
    case 'd':
    case 'deps':
      return deps(cwd)
  }

  const guessCwd = path.join(cwd, rest[0] || '')

  if (fs.existsSync(path.join(guessCwd, 'package.json'))) {
    return list(guessCwd)
  } else {
    return console.info(helpText)
  }
}

async function checkDirPkg (dir) {
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return true
  } else {
    throw new Error(`No ${kleur.yellow('package.json')} in ${kleur.yellow(dir)}`)
  }
}

function createErrorMessage (err) {
  // console.error(err)
  switch (err.code) {
    case 'ENOENT':
      return `Cannot ${err.syscall} ${kleur.yellow(err.path)}`
    default:
      return err.message
  }
}
