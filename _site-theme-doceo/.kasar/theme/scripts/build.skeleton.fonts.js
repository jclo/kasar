/* *****************************************************************************
 *
 * Copies vendor fonts.
 *
 * Private Functions:
 *  . _buildfonts                 copies vendor fonts,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:fonts,
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
const fs   = require('fs')
    , path = require('path')
    ;


// -- Local Modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local Constants
const { dist }    = config
    , { fonts }   = themeconfig
    , fontsfolder = `${dist}/fonts`
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies vendor fonts.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildfonts(done) {
  if (!fonts || !fonts.local || !fonts.local.length) {
    done();
    return;
  }

  /**
   * Wait all processes completed;
   */
  let pending = fonts.local.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      done();
    }
  }

  let filename;
  for (let i = 0; i < fonts.local.length; i++) {
    filename = path.basename(fonts.local[i]);
    fs.cp(fonts.local[i], `${fontsfolder}/${filename}`, { recursive: true }, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}


// -- Public -------------------------------------------------------------------

/**
 * Executes copy:fonts.
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
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:fonts\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:fonts\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _buildfonts(next);
}


// -- Export
module.exports = Build;
