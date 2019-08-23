const fs = require('fs')
const path = require('path')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')

module.exports = function (dir, pkg) {
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
  } catch {}
}
