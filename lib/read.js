import fs from 'fs'
import path from 'path'
import termMd from 'term-md'

export default function read (dir, pkg) {
  const packageDir = path.join(dir, 'node_modules', pkg)
  const readme = findReadme(packageDir)
  if (readme) {
    console.info(termMd(readme))
  }
}

function findReadme (dir) {
  let readme
  const names = ['README.md', 'readme.md', 'readme', 'README']
  names.find(file => {
    readme = tryRead(path.join(dir, file))
    return readme
  })
  return readme
}

function tryRead (filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (e) {}
}
