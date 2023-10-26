/* *****************************************************************************
 *
 * Creates the App.
 *
 * Private Functions:
 *  . _uglify                     uglifies the umd or es6 module,
 *  . _domodule                   creates the ES6 module from the generic library,
 *  . _doumdlib                   creates the UMD module from the generic library,
 *  . _dogeneric                  creates the generic library,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:project:app,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */


// -- Node modules
const fs         = require('fs')
    , Pakket     = require('pakket')
    , { minify } = require('terser')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    , pack        = require('../../../../package.json')
    ;


// -- Local constants
const { dist }       = config
    , { ES6GLOB }    = themeconfig
    , { source }     = themeconfig
    , { exportname } = themeconfig
    , { bundle }     = themeconfig
    , { license }    = themeconfig
    , { version }    = pack
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Uglifies the umd or es6 module.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the library or module,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _uglify(data, callback) {
  let content = license;
  content += data.replace(/\/\*! \*\*\*/g, '/** ***');
  minify(content, {})
    .then((result) => {
      callback(result);
    });
}

/**
 * Creates the ES6 module from the generic library.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the generic library,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _domodule(data, next) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:app:do:module\x1b[89m\x1b[0m\'...\n');

  let exportM = '\n// -- Export\n';
  exportM += `export default ${ES6GLOB}.${exportname};`;

  let content = license;
  content += data
    .replace('{{lib:es6:define}}', `const ${ES6GLOB} = {};`)
    .replace('{{lib:es6:link}}', ES6GLOB)
    .replace('{{lib:es6:export}}', exportM)
  ;

  fs.writeFile(`${dist}/js/${bundle}.mjs`, content, { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);

    _uglify(content, (min) => {
      fs.writeFile(`${dist}/js/${bundle}.min.mjs`, min.code, { encoding: 'utf8' }, (err1) => {
        if (err1) throw new Error(err1);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mbuild:project:app:do:module\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        next();
      });
    });
  });
}

/**
 * Creates the UMD module from the generic library.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the generic library,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doumdlib(data, next) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:app:do:umd:lib\x1b[89m\x1b[0m\'...\n');

  let content = license;
  content += data
    .replace('{{lib:es6:define}}\n', '')
    .replace('{{lib:es6:link}}', 'this')
    .replace('{{lib:es6:export}}\n', '')
  ;

  fs.writeFile(`${dist}/js/${bundle}.js`, content, { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);


    _uglify(content, (min) => {
      fs.writeFile(`${dist}/js/${bundle}.min.js`, min.code, { encoding: 'utf8' }, (err1) => {
        if (err1) throw new Error(err1);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mbuild:project:app:do:umd:lib\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        next();
      });
    });
  });
}

/**
 * Creates the generic library.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _dogeneric(callback) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:app:do:generic\x1b[89m\x1b[0m\'...\n');

  return new Promise((resolve) => {
    const pakket = Pakket(source, { export: exportname, type: 'generic' });
    pakket.get((data) => {
      const content = data
        .replace(/{{lib:name}}/g, bundle)
        .replace(/{{lib:exportname}}/g, exportname)
        .replace(/{{lib:version}}/g, version)
        // Remove extra global.
        // (keep the first global only)
        .replace(/\/\* global/, '/* gloobal')
        .replace(/\/\* global[\w$_\s,]+\*\//g, '/* - */')
        .replace(/\/\* gloobal/, '/* global')
        // Remove extra 'use strict'.
        // (keep the two first only)
        .replace(/use strict/, 'use_strict')
        .replace(/use strict/, 'use_strict')
        .replace(/'use strict';/g, '/* - */')
        .replace(/use_strict/g, 'use strict')
      ;

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:app:do:generic\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      resolve(content);
      if (callback) callback(content);
    });
  });
}

/**
 * Builds the app.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _build(done) {
  const PENDING = 2;

  /**
   * Executes next until completion.
   */
  let pending = PENDING;
  function next() {
    pending -= 1;
    if (!pending) {
      done();
    }
  }

  _dogeneric((content) => {
    _doumdlib(content, next);
    _domodule(content, next);
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:project:app.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 1;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:app\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:app\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _build(next);
}


// -- Export
module.exports = Build;
