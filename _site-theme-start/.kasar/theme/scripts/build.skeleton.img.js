/* *****************************************************************************
 *
 * Copies theme images to dist.
 *
 * Private Functions:
 *  . _copyimg                    copies './site/.kasar/theme/img' to './site/_dist/img',
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:img,
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
/* eslint no-unused-vars: 0, curly: 0 */


// -- Vendor Modules
import fs from 'fs';


// -- Local Modules
import config from '../../../config.js';


// -- Local Constants
const { dist } = config
    , source   = './site/.kasar/theme/img'
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies './site/.kasar/theme/img' folder contents to './site/_dist/img' folder.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copyimg(done) {
  fs.cp(source, `${dist}/img`, { recursive: true }, (err) => {
    if (err) throw new Error(err);

    done();
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:img.
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
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:img\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:img\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _copyimg(next);
}


// -- Export
export default Build;
