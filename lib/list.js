const kleur = require('kleur')
const columnify = require('columnify')
const { loadPackageJson } = require('./utils')

module.exports = function list (cwd) {
  const pkg = loadPackageJson(cwd)

  if (!pkg.scripts) {
    return console.info(`\n  No ${kleur.bold('scripts')} property in package.json\n`)
  }

  if (!Object.keys(pkg.scripts).length) {
    return console.info(`\n  Empty ${kleur.bold('scripts')} in package.json\n`)
  }

  console.info(`\n  npm scripts in ${kleur.yellow(cwd + '/package.json')}:\n`)

  const scriptsTable = columnify(pkg.scripts, {
    showHeaders: false,
    config: {
      key: {
        // A hack to preserve indent whitespace
        // https://github.com/timoxley/columnify/issues/45
        dataTransform: data => `\u2063 * ${kleur.bold().green(data)}`
      }
    }
  })

  console.info(scriptsTable)
}
