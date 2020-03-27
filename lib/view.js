module.exports = function view (cwd, propPath = 'version') {
  if (!propPath) return

  try {
    const path = require('path')
    const pkgJson = require(path.join(cwd, 'package.json'))
    const result = readObject(pkgJson, propPath)
    console.log(result)
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.error('\n  No package.json found')
    } else {
      console.error(e.message)
    }
  }
}

/** A handmade _.get() */
function readObject (object, propPath, defaultValue) {
  const props = propPath.split('.')

  const result = props.reduce((accu, curr) => {
    if (object === undefined || object === null) {
      return undefined
    }
    return object[curr]
  }, object)

  return result === undefined ? defaultValue : result
}
