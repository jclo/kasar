/* *****************************************************************************
 *
 * Copies tarteaucitron cookie manager.
 *
 * Private Functions:
 *  . _copy                       copies tarte au citron cookie manager,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:tarte,
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
/* eslint curly: 0 */


// -- Vendor Modules
import fs from 'fs';


// -- Local Modules
import config from '../../../config.js';


// -- Local Constants
const TARTEAUCITRON     = './node_modules/tarteaucitronjs'
    , { dist }          = config
    , { tarteaucitron } = config
    , vendor            = './site/vendor'
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies independant js project files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copy(done) {
  if (!tarteaucitron || !tarteaucitron.sitega4id) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:tarteaucitron:copy\x1b[89m\x1b[0m\'...\n');

  fs.access(vendor, (err) => {
    if (err) throw new Error(err);

    fs.cp(TARTEAUCITRON, `${dist}/vendor/tarteaucitron`, { recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:tarteaucitron:copy\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:skeleton:tarte.
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
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:tarteaucitron\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:tarteaucitron\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _copy(next);
}


// -- Export
export default Build;
