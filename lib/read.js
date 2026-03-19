import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import TerminalRenderer from 'marked-terminal'

export default function read (dir, pkg) {
  const readme = findReadme(path.join(dir, 'node_modules', pkg))
  if (readme) {
    marked.setOptions({
      renderer: new TerminalRenderer()
    })
    console.info(marked(readme))
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
