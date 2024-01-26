# Kasar

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Github workflow][ci-image]][ci-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm bundle size][npm-bundle-size-image]][npm-bundle-size-url]
[![License][license-image]](LICENSE.md)

Kasar is static site generator. It creates a static website from markdown or HTML pages. It is powered by **npm scripts** and **RView**.

The advantages of the static websites are their responsiveness, the limited server resources needed and the simplicity of installation.

Thus, you can run your website on cheapest web servers and you just need to copy and paste a folder to get your web server up and running!


## How to install Kasar

You first have to create an empty NPM project. When it is done, install **Kasar** with the command:

```bash
npm install @mobilabs/kasar --save
```

Then, you should add the three following scripts in the script section of the file **package.json**:

```javascript
{
  "scripts": {
    "kasar:init": "kasar init --theme $1",
    "kasar:build": "kasar build",
    "kasar:start": "kasar serve --port $1"
  }
}
```

## Quick Startup

### How to create your project

You have to run the following command:

```bash
npm run kasar:init
```

The script creates the folder **site** with the following tree:

```bash
site
  |_ .kasar
  |_ img
  |_ js
  |_ php
  |_ styles
  |_ tobuildweb
  |_ vendor
  |_ webpages
  |_ config.js
```

### Fill the vendor folder

The `start` theme requires the `Montserrat` fonts and `Highlight.js` as a code syntax highlighter. These packages must be downloaded from their respective websites. The readme file in the vendor folder gives instructions how to proceed.


### How to build your website

Just type the following command:

```bash
npm run kasar:build
```

A new folder **_dist** appears under **site**:

```bash
site
  |_ _dist
  |_ .kasar
  |_ img
  |_ ...
```

This folder contains all the files requires to run a website (index.html, css, js, etc.).


### How to run your website on your machine

Just type the following command:

```bash
npm run kasar:start
```

This command launches a local web server running at the address **http://localhost:8080** that displays the website on your browser.

On the displayed page, click the button `click me` to read the detailed documentation.


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/kasar.svg?style=flat-square
[release-image]: https://img.shields.io/github/release/jclo/kasar.svg?include_prereleases&style=flat-square
[commit-image]: https://img.shields.io/github/last-commit/jclo/kasar.svg?style=flat-square
[ci-image]: https://github.com/jclo/kasar/actions/workflows/ci.yml/badge.svg
[coveralls-image]: https://img.shields.io/coveralls/jclo/kasar/master.svg?style=flat-square
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/@mobilabs/kasar.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/@mobilabs/kasar.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@mobilabs/kasar
[release-url]: https://github.com/jclo/kasar/tags
[commit-url]: https://github.com/jclo/kasar/commits/master
[ci-url]: https://github.com/jclo/kasar/actions/workflows/ci.yml
[coveralls-url]: https://coveralls.io/github/jclo/kasar?branch=master
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/@mobilabs/kasar
[license-url]: http://opensource.org/licenses/MIT