# Kasar

[![NPM version][npm-image]][npm-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)

[![NPM install][npm-install-image]][npm-install-url]

Kasar is static site generator. It creates a static website from markdown or HTML pages. It is powered by **Gulp** and **View**.

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
    "kinit": "kasar init",
    "build": "kasar build",
    "web": "kasar serve"
  }
}
```

## Quick Startup

### How to create your project

You have to run the following command:

```bash
npm run kinit
```

The script creates the folder **site** with the following tree:

```bash
site
  |_ .kasar
  |_ img
  |_ php
  |_ styles
  |_ tasks
  |_ tobuildweb
  |_ webpages
  |_ config.js
```

### How to build your website

Just type the following command:

```bash
npm run build
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
npm run web
```

This command launches a local web server running at the address **http://localhost:8080** that displays the website on your browser.

On the displayed page, click the button `click me` to read the detailed documentation.


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/kasar.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/@mobilabs/kasar.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/@mobilabs/kasar.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/kasar.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/kasar/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/kasar/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/kasar/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/@mobilabs/kasar.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@mobilabs/kasar
[npm-install-url]: https://nodei.co/npm/@mobilabs/kasar
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/@mobilabs/kasar
[travis-url]: https://travis-ci.org/jclo/kasar
[coveralls-url]: https://coveralls.io/github/jclo/kasar?branch=master
[dependencies-url]: https://david-dm.org/jclo/kasar
[devdependencies-url]: https://david-dm.org/jclo/kasar?type=dev
[license-url]: http://opensource.org/licenses/MIT
