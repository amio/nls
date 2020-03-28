const { join } = require('path')
const kleur = require('kleur')
const columnify = require('columnify')
const { loadPackageJson } = require('./utils')

module.exports = function deps (cwd) {
  const { dependencies, devDependencies, optionalDependencies } = loadPackageJson(cwd)

  let depsData = []

  if (dependencies) {
    depsData = depsData.concat(formatDepsData(cwd, dependencies, 'dep'))
  }

  if (devDependencies) {
    depsData = depsData.concat(formatDepsData(cwd, devDependencies, 'dev'))
  }

  if (optionalDependencies) {
    depsData = depsData.concat(formatDepsData(cwd, devDependencies, 'optional'))
  }

  console.info(`\n  dependencies in ${kleur.yellow(cwd + '/package.json')}\n`)
  console.info(createDepsTable(depsData), '\n')
}

const styleText = {
  dep: text => kleur.bold().blue(text),
  dev: text => kleur.blue(text),
  optional: text => kleur.italic(text)
}

function formatDepsData (cwd, dependencies, style) {
  return Object.keys(dependencies).map(pkg => {
    const pkgJson = loadPackageJson(join(cwd, 'node_modules', pkg))
    const { name, version, license = '', homepage } = pkgJson

    return { name: styleText[style](name), version, license, homepage }
  })
}

function createDepsTable (deps) {
  return columnify(deps, {
    showHeaders: false,
    dataTransform: data => `${data} \u2063`,
    config: {
      name: {
        dataTransform: data => `\u2063 ${data} \u2063`,
        headingTransform: data => `\u2063 ${data.toUpperCase()} \u2063`
      },
      version: {
        dataTransform: data => `v${data} \u2063`
      }
    }
  })
}
