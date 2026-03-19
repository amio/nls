import { readObject, loadPackageJson } from './utils.js'

export default function view (cwd, propPath = 'version') {
  if (!propPath) return

  const pkg = loadPackageJson(cwd)

  const result = readObject(pkg, propPath)

  if (result === undefined) {
    return
  }

  console.info(result)
}
