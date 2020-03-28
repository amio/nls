const { readObject } = require('./utils')

module.exports = function view (cwd, propPath = 'version') {
  if (!propPath) return

  const path = require('path')
  const pkgJson = require(path.join(cwd, 'package.json'))

  const result = readObject(pkgJson, propPath)

  if (result === undefined) {
    return
  }

  console.info(result)
}
