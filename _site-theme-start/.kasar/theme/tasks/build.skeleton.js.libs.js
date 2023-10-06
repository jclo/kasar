/* *****************************************************************************
 *
 * Copies js vendor libraries.
 *
 * Private Functions:
 *  . _buildminilibs              copies and minifies vendor libs,
 *  . _buildlibs                  copies vendor libs,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:js:libs,
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
const { dist }   = config
    , { libs }   = themeconfig
    , libsfolder = `${dist}/vendor/libs`
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies and minifies vendor libs.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildminilibs(done) {
  if (!libs || !libs.tominify || !libs.tominify.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js:libs:buildminilibs\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all processes completed;
   */
  let pending = libs.tominify.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js:libs:buildminilibs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  for (let i = 0; i < libs.tominify.length; i++) {
    fs.readFile(libs.tominify[i], 'utf8', (err, data) => {
      if (err) throw new Error(err);

      const filename = path.basename(libs.tominify[i]).replace('.js', '.min.js');

      minify(data, {})
        .then((min) => {
          fs.writeFile(`${libsfolder}/${filename}`, min.code, { encoding: 'utf8' }, (err2) => {
            if (err2) throw new Error(err2);
            _next();
          });
        });
    });
  }
}

/**
 * Copies vendor libs.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildlibs(done) {
  if (!libs || !libs.minified || !libs.minified.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js:libs:buildlibs\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all processes completed;
   */
  let pending = libs.minified.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js:libs:buildlibs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  let filename;
  for (let i = 0; i < libs.minified.length; i++) {
    filename = path.basename(libs.minified[i]);
    fs.cp(libs.minified[i], `${libsfolder}/${filename}`, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:post:skeleton.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 2;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js:libs\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js:libs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _buildlibs(next);
  _buildminilibs(next);
}


// -- Export
module.exports = Build;
