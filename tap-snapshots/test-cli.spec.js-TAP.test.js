/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports['test/cli.spec.js TAP runs `why qs` > snapshot 1'] = `

  Who required qs:

  nls > tap > coveralls > request > qs@6.5.2

`

exports['test/cli.spec.js TAP runs in root dir > snapshot 1'] = `

  npm scripts:

  * lint    standard lib/*
  * pretest npm run lint
  * test    tap test/*.spec.js --reporter spec --test-env=FORCE_COLOR=0
  * snap    TAP_SNAPSHOT=1 npm run test

`
