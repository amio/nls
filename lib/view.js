const { readObject } = require('./utils')

module.exports = function view (cwd, propPath = 'version') {
  if (!propPath) return

  try {
    const path = require('path')
    const pkgJson = require(path.join(cwd, 'package.json'))
    const result = readObject(pkgJson, propPath)
    console.info(result)
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.error('\n  No package.json found')
    } else {
      throw e
    }
  }
}
