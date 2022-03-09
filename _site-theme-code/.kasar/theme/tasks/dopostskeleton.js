/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const { src, dest } = require('gulp')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { base } = themeconfig
    , { dist } = config
    , img      = `${base}/site/img/**/*`
    ;


// -- Local variables


// -- Gulp Private Tasks

/**
 * Copies images.
 */
function cpimg() {
  return src(img)
    .pipe(dest(`${dist}/img`))
  ;
}


// Gulp Public Tasks
module.exports = cpimg;
