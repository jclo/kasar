/* *****************************************************************************
 *
 * Adds trackers to index.html file.
 *
 *
 * Private Functions:
 *  . _addTrackers                adds the trackers,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:project:trackers,
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
const fs = require('fs')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { GA4 }     = themeconfig
    , { KA }      = themeconfig
    , { Axeptio } = themeconfig
    , { dist }    = config
    , { google }  = config
    , { kiwi }    = config
    , { axeptio } = config
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Adds the trackers.
 *
 * @function (arg1, arg2)
 * @private
 * @param {XMLString}      the original index.html file,
 * @param {Function}       the function to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _addTrackers(index, done) {
  let data = google && google.sitega4id && GA4 && GA4.xmlString && GA4.xmlString.length > 0
    ? index.replace(/<!-- {{tracker:google}} -->/, GA4.xmlString.replace(/{{tracker:siteid}}/g, google.sitega4id))
    : index.replace(/<!-- {{tracker:google}} -->/, '')
  ;

  data = kiwi && kiwi.siteid && KA && KA.xmlString && KA.xmlString.length > 0
    ? data.replace(/<!-- {{tracker:kiwi}} -->/, KA.xmlString.replace(/{{tracker:siteid}}/g, kiwi.siteid))
    : data.replace(/<!-- {{tracker:kiwi}} -->/, '')
  ;

  data = axeptio && axeptio.siteid && Axeptio && Axeptio.xmlString && Axeptio.xmlString.length > 0
    ? data.replace(/<!-- {{tracker:axeptio}} -->/, Axeptio.xmlString.replace(/{{tracker:siteid}}/g, axeptio.siteid))
    : data.replace(/<!-- {{tracker:axeptio}} -->/, '')
  ;

  fs.writeFile(`${dist}/index.html`, data, { encoding: 'utf8' }, (err1) => {
    if (err1) throw new Error(err1);
    done();
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:project:trackers.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(data, done) {
  const PENDING = 1;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:trackers\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes next until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:trackers\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _addTrackers(data, next);
}


// -- Export
module.exports = Build;
