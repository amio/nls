const fs = require('fs')
const path = require('path')
const npmWhy = require('npm-why')
const yarnWhy = require('yarn-why/cli-main.js')

module.exports = function (dir, pkg) {
  if (pkg === undefined) {
    return console.info('\n  No one requires no one.\n')
  }

  if (fs.existsSync(path.join(dir, 'package-lock.json'))) {
    return npmWhy.main(dir, pkg)
  }

  if (fs.existsSync(path.join(dir, 'yarn.lock'))) {
    return yarnWhy(dir, pkg)
  }
}
