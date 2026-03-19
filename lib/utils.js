import kleur from 'kleur'
import path from 'path'
import fs from 'fs'

/** Safe load package.json */
export function loadPackageJson (cwd) {
  try {
    const file = path.join(cwd, 'package.json')
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    throw new Error(`Cannot read package.json in ${kleur.yellow(cwd)}`)
  }
}

/** A handmade lodash.get() */
export function readObject (object, propPath, defaultValue) {
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
export function indent (padding, paragraph) {
  return paragraph.split('\n').map(line => padding + line).join('\n')
}
