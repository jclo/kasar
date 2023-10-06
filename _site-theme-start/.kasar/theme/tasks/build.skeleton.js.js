/* *****************************************************************************
 *
 * Bundles and minifies js files.
 *
 * Private Functions:
 *  . _buildsw                    copies and minifies the service worker,
 *  . _buildjs                    bundles and minifies the js project files,
 *  . _copyjs                     copies independant js project files,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:js,
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

'use strict';


// -- Node modules
const fs         = require('fs')
    , path       = require('path')
    , { minify } = require('terser')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { dist }    = config
    , { sw }      = themeconfig
    , { pjs }     = themeconfig
    , { js }      = themeconfig
    , libjsfolder = `${dist}/js`
    , libjsname   = 'main'
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies and minifies the service worker.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildsw(done) {
  if (!sw || !sw.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js:buildsw\x1b[89m\x1b[0m\'...\n');

  fs.readFile(sw, { encoding: 'utf8' }, (err1, data) => {
    if (err1) throw new Error(err1);

    minify(data, {})
      .then((min) => {
        fs.writeFile(`${dist}/sw.js`, min.code, { encoding: 'utf8' }, (err2) => {
          if (err2) throw new Error(err2);

          const d2 = new Date() - d1;
          process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js:buildsw\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
          done();
        });
      });
  });
}

/**
 * Bundles and minifies the js project files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildjs(done) {
  if (!pjs || !pjs.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js:buildjs\x1b[89m\x1b[0m\'...\n');

  let bundle = '';
  for (let i = 0; i < pjs.length; i++) {
    bundle += fs.readFileSync(pjs[i], { encoding: 'utf8' });
  }

  minify(bundle, {})
    .then((min) => {
      //
      fs.writeFile(`${libjsfolder}/${libjsname}.js`, bundle, { encoding: 'utf8' }, (err1) => {
        if (err1) throw new Error(err1);

        fs.writeFile(`${libjsfolder}/${libjsname}.min.js`, min.code, { encoding: 'utf8' }, (err2) => {
          if (err2) throw new Error(err2);

          const d2 = new Date() - d1;
          process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js:buildjs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
          done();
        });
      });
    });
}

/**
 * Copies independant js project files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copyjs(done) {
  if (!js || !js.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js:copyjs\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all processes completed;
   */
  let pending = js.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js:copyjs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  for (let i = 0; i < js.length; i++) {
    fs.readFile(js[i], { encoding: 'utf8' }, (err, data) => {
      if (err) throw new Error(err);

      const filename = path.basename(js[i]).replace('.js', '');
      minify(data, {})
        .then((min) => {
          fs.writeFile(`${libjsfolder}/${filename}.min.js`, min.code, { encoding: 'utf8' }, (err1) => {
            if (err1) throw new Error(err1);
            _next();
          });
        });
    });
  }
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:js.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 3;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _copyjs(next);
  _buildjs(next);
  _buildsw(next);
}


// -- Export
module.exports = Build;
