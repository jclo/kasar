// ESLint declarations
/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const { src, dest } = require('gulp')
    , fs            = require('fs')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { dist }      = config
    , { php }       = themeconfig
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the list of available php files.
 */
function getPHPList() {
  const phpsrc = []
    ;

  if (!php || !php.length) {
    return phpsrc;
  }

  for (let i = 0; i < php.length; i++) {
    if ((php[i] === '.htaccess' || php[i].match(/.php/)) && fs.existsSync(php[i])) {
      phpsrc.push(php[i]);
    }
  }
  return phpsrc;
}


// -- Gulp Private Tasks

/**
 * Copies php files.
 */
function dophp(done) {
  const phpsrc = getPHPList();

  if (!phpsrc || !phpsrc.length) {
    done();
    return phpsrc;
  }

  return src(phpsrc)
    .pipe(dest(`${dist}/php/`))
  ;
}


// Gulp Public Tasks
module.exports = dophp;
