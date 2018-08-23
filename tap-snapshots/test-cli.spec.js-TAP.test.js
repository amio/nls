/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/cli.spec.js TAP runs in home dir > snapshot 1`] = `

  npm scripts:

  * lint    standard
  * pretest npm run lint
  * test    tap test/*.spec.js --reporter spec
  * snap    TAP_SNAPSHOT=1 tap test/*.spec.js

`

exports[`test/cli.spec.js TAP runs \`why qs\` > snapshot 1`] = `

  Who required [34mqs[39m:

  [34mnls[39m > [34mtap[39m > [34mcoveralls[39m > [34mrequest[39m > [34mqs[39m[2m@6.5.2[22m

`
