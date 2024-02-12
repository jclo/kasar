/* *****************************************************************************
 *
 * Bundles and minifies js files.
 *
 * Private Functions:
 *  . _buildsw                    copies and minifies the service worker,
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


// -- Vendor Modules
const fs         = require('fs')
    , path       = require('path')
    , { minify } = require('terser')
    ;


// -- Local Modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local Constants
const { dist } = config
    , { sw }   = themeconfig
    ;


// -- Local Variables


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
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:js:build:sw\x1b[89m\x1b[0m\'...\n');

  fs.readFile(sw, { encoding: 'utf8' }, (err1, data) => {
    if (err1) throw new Error(err1);

    minify(data, {})
      .then((min) => {
        fs.writeFile(`${dist}/sw.js`, min.code, { encoding: 'utf8' }, (err2) => {
          if (err2) throw new Error(err2);

          const d2 = new Date() - d1;
          process.stdout.write(`Finished '\x1b[36mbuild:skeleton:js:build:sw\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
          done();
        });
      });
  });
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
  const PENDING = 1;

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

  _buildsw(next);
}


// -- Export
module.exports = Build;
