/** A handmade lodash.get() */
function readObject (object, propPath, defaultValue) {
  const props = propPath.split('.')

  const result = props.reduce((accu, curr) => {
    if (object === undefined || object === null) {
      return undefined
    }
    return accu[curr]
  }, object)

  return result === undefined ? defaultValue : result
}

module.exports = {
  readObject
}
