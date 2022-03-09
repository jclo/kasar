/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0,
  no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const { src, dest, parallel } = require('gulp')
    , concat   = require('gulp-concat')
    , cleanCSS = require('gulp-clean-css')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { dist }  = config
    , { html5 } = themeconfig
    , { html5: { modernizr } } = themeconfig
    , { html5: { normalize } } = themeconfig
    ;


// -- Local variables


// -- Gulp Private Tasks

/**
 * Copies modernizr js library retrieved from node_modules/html5-boilerplate.
 */
function cpmodernizr(done) {
  if (!html5 || !html5.modernizr) {
    done();
    return null;
  }

  return src(modernizr)
    .pipe(dest(`${dist}/vendor/libs`))
  ;
}


/**
 * Copies and minifies normalize.css retrieved from node_modules/html5-boilerplate.
 */
function minifynormalize(done) {
  if (!html5 || !html5.normalize) {
    done();
    return null;
  }

  return src(normalize)
    .pipe(cleanCSS({
      // specialComments: 1,
      // format: 'keep-breaks',
      rebaseTo: '.',
    }))
    // .pipe(header('<style>'))
    // .pipe(footer('</style>'))
    .pipe(concat('normalize.style'))
    .pipe(dest(`${dist}/css/`))
  ;
}


// Gulp Public Tasks
module.exports = parallel(cpmodernizr, minifynormalize);
