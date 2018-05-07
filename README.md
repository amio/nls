# nls [![npm-version][npm-badge]][npm-link]

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

## License

ISC @ Amio

[screenshot]: ./nls-screenshot.png
[amio-link]: https://github.com/amio
[npm-badge]: https://img.shields.io/npm/v/nls.svg?style=flat-square
[npm-link]: http://www.npmjs.com/package/nls
