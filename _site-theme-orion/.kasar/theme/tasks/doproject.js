/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0,
  no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const { src, dest } = require('gulp')
    , concat        = require('gulp-concat')
    , cleanCSS      = require('gulp-clean-css')
    , replace       = require('gulp-replace')
    , uglify        = require('gulp-uglify-es').default
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { dist } = config
    , { pjs }  = themeconfig
    , { css }  = themeconfig
    , { sw }   = themeconfig
    ;


// -- Local variables


// -- Gulp Private Tasks

/**
 * Concatenates js files.
 */
function _dojs(done) {
  if (!pjs || !pjs.length) {
    done();
    return null;
  }

  return src(pjs)
    .pipe(concat('main.js'))
    .pipe(dest(`${dist}/js/`))
  ;
}


/**
 * Concatenates and uglyfies js files.
 */
function _dojsu(done) {
  if (!pjs || !pjs.length) {
    done();
    return null;
  }

  return src(pjs)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest(`${dist}/js/`))
  ;
}


/**
 * Concatenates and uglyfies js files.
 */
function _dosw(done) {
  if (!sw || !sw.length) {
    done();
    return null;
  }

  return src(sw)
    .pipe(uglify())
    .pipe(dest(dist))
  ;
}


/**
 * Merges and minifies all CSS in one.
 */
function _docss(done) {
  if (!css || !css.length) {
    done();
    return null;
  }

  return src(css)
    .pipe(cleanCSS({
      specialComments: 1,
      format: 'keep-breaks',
      // rebaseTo: './theme/pages/components/css',
      rebaseTo: '',
    }))
    .pipe(concat('style.css'))
    .pipe(replace('../webfonts', '../fonts/fontawesome-free/webfonts'))
    .pipe(dest(`${dist}/css/`))
  ;
}


// Gulp Public Tasks
module.exports = {
  dojs() {
    return _dojs();
  },

  dojsu() {
    return _dojsu();
  },

  dosw() {
    return _dosw();
  },

  docss() {
    return _docss();
  },
};
