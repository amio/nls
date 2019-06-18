# nls [![npm-version][npm-badge]][npm-link] [![install size][pp-badge]][pp-link]

Missing inspector for npm packages.

![nls-screenshot][screenshot]

## Install & Usage

```bash
npm install -g nls
```

```bash
Usage

  $ nls [<target-dir>]      List available npm scripts.
  $ nls why <package-name>  Identifies why a package has been installed.

Options

  -h, --help      Output usage information
  -v, --version   Output the version number

Examples

  # List npm scripts in current dir
  $ nls

  # List npm scripts in "node_modules/chalk"
  $ nls node_modules/chalk

  # Find who depend upon package 'chalk'.
  $ nls why chalk
```

## Related

- [yarn-why](https://github.com/amio/yarn-why) - Identifies why a package has been installed (with `yarn.lock`)
- [npm-why](https://github.com/amio/npm-why) - Identifies why a package has been installed (with `package-lock.json`)

## License

MIT @ Amio

[screenshot]: ./nls-screenshot.png
[amio-link]: https://github.com/amio
[npm-badge]: https://badgen.net/npm/v/nls
[npm-link]: https://www.npmjs.com/package/nls
[pp-badge]: https://badgen.net/packagephobia/install/nls
[pp-link]: https://packagephobia.now.sh/result?p=nls
