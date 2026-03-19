import fs from 'fs'
import path from 'path'
import npmWhy from 'npm-why'
import yarnWhy from 'yarn-why/cli-main.js'

export default function why (dir, pkg) {
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
