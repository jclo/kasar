/* *****************************************************************************
 *
 * Does ...
 *
 * build.module.template.js module dooes ...
 *
 * Private Functions:
 *  . _xxx                        does ...
 *
 *
 * Public Functions:
 *  . Build                       executes build:module:template,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* global */
/* eslint no-unused-vars: 0 */


// -- Vendor Modules
import fs from 'fs';
import path from 'path';


// -- Local Modules
import themeconfig from '../../theme-config.js';
import config from '../../../config.js';


// -- Local Constants
const { dist } = config
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Does ...
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _xxx(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:module:template:xxx\x1b[89m\x1b[0m\'...\n');

  // ...

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mbuild:module:template:xxx\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
  done();
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:module:template.
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
  process.stdout.write('Starting \'\x1b[36mbuild:module:template\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:module:template\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _xxx(next);
}


// -- Export
export default Build;
