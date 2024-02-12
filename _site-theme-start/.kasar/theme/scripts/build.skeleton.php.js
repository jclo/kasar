/* *****************************************************************************
 *
 * Copies php files.
 *
 * Private Functions:
 *  . _buildphp                   copies php files,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:php,
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
const { dist } = config
    , { php }  = themeconfig
    , phpfolder = `${dist}/php`
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies php files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildphp(done) {
  if (!php || !php.length) {
    done();
    return;
  }

  const list = [];
  for (let i = 0; i < php.length; i++) {
    if ((php[i] === '.htaccess' || php[i].match(/.php/)) && fs.existsSync(php[i])) {
      list.push(php[i]);
    }
  }
  if (!list.length) {
    done();
    return;
  }

  /**
   * Wait all processes completed;
   */
  let pending = list.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      done();
    }
  }

  let filename;
  for (let i = 0; i < list.length; i++) {
    filename = path.basename(list[i]);
    fs.cp(list[i], `${phpfolder}/${filename}`, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:php.
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
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:php\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:php\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _buildphp(next);
}


// -- Export
module.exports = Build;
