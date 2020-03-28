const path = require('path')

/** A handmade lodash.get() */
function readObject (object, propPath, defaultValue) {
  const props = propPath.split('.')

  const result = props.reduce((accu, curr) => {
    if (accu === undefined || accu === null) {
      return undefined
    }
    return accu[curr]
  }, object)

  return result === undefined ? defaultValue : result
}


/** Safe load package.json */
function loadPackageJson (cwd) {
  try {
    const file = path.join(cwd, 'package.json')
    return require(file)
  } catch (e) {
    throw new Error(`Cannot read package.json in ${kleur.yellow(cwd)}`)
  }
}

module.exports = {
  readObject,
  loadPackageJson
}
