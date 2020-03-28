const { join } = require('path')
const columnify = require('columnify')
const { loadPackageJson } = require('./utils')

module.exports = function deps (cwd, pkg) {
  const { dependencies, devDependencies } = loadPackageJson(cwd)

  const deps = Object.keys(dependencies).map(pkg => {
    const pkgJson = loadPackageJson(join(cwd, 'node_modules', pkg))
    const { name, version, description, repository, license = '', dependencies = {}, homepage, author } = pkgJson
    return { name, version, license, homepage }
  })

  const depsTable = columnify(deps, {
    minWidth: 7,
    truncate: true,
    config: {
      description: { maxWidth: 40 },
      homepage: { maxWidth: 60 }
    }
  })

  process.stdout.write('\n')
  console.info(depsTable.split('\n').map(line => '  ' + line).join('\n'), '\n')
}
