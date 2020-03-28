const kleur = require('kleur')
const path = require('path')

/** Safe load package.json */
function loadPackageJson (cwd) {
  try {
    const file = path.join(cwd, 'package.json')
    return require(file)
  } catch (e) {
    throw new Error(`Cannot read package.json in ${kleur.yellow(cwd)}`)
  }
}

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

/** Add indent padding to paragraph text */
function indent (padding, paragraph) {
  return paragraph.split('\n').map(line => padding + line).join('')
}

module.exports = {
  loadPackageJson,
  readObject,
  indent
}
