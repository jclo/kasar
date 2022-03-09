// ESLint declarations
/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
/* eslint-disable-next-line object-curly-newline */
const { src, dest, series, parallel } = require('gulp')
    , rename = require('gulp-rename')
    , uglify = require('gulp-uglify-es')
    ;


// -- Local modules
const themeconfig     = require('../../theme-config')
    , config          = require('../../../config')
    , dohtml5         = require('./dohtml5')
    , { dojs }        = require('./doproject')
    , { dojsu }       = require('./doproject')
    , { dosw }        = require('./doproject')
    , { docss }       = require('./doproject')
    , dophp           = require('./dophp')
    , dopostskeleton  = require('./dopostskeleton')
    ;


// -- Local constants
const { base }      = themeconfig
    , { dist }      = config
    , { files2inc } = themeconfig
    , { js }        = themeconfig
    , { libs }      = themeconfig
    , { google }    = config
    , { tracker }   = themeconfig
    , { fonts }     = themeconfig
    , { img }       = themeconfig
    ;


// -- Local variables


// -- Gulp Private Tasks

/**
 * Creates and fills the new dist.
 */
function create() {
  return src(files2inc)
    .pipe(dest(dist))
  ;
}


/**
 * Copies the not to merge js files.
 */
function cpjs(done) {
  if (!js || !js.length) {
    done();
    return null;
  }

  return src(js, { base: '.' })
    .pipe(dest(dist))
  ;
}


/**
 * Copies the vendor libraries.
 */
function cpminifiedlibs(done) {
  if (!libs || !libs.minified || !libs.minified.length) {
    done();
    return null;
  }

  return src(libs.minified)
    .pipe(dest(`${dist}/vendor/libs/`))
  ;
}


/**
 * Copies and minifies the vendor libraries.
 */
function cp2minifylibs(done) {
  if (!libs || !libs.tominify || !libs.tominify.length) {
    done();
    return null;
  }

  return src(libs.tominify)
    .pipe(uglify(/* { output: { comments: 'license' } } */))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(`${dist}/vendor/libs/`))
  ;
}


/**
 * Copies Google's Analytics identification file.
 */
function cpga(done) {
  if (!google || !google.verify || !google.verify.v2 || !google.verify.v2.length) {
    done();
    return null;
  }

  return src(google.verify.v2)
    .pipe(dest(dist))
  ;
}


/**
 * Copies the Kiwi tracker.
 */
function cptrackerjs(done) {
  if (!tracker || !tracker.js) {
    done();
    return null;
  }

  return src(tracker.js)
    .pipe(dest(`${dist}/js/`))
  ;
}


/**
 * Copies the Kiwi tracker.
 */
function cptrackerphp(done) {
  if (!tracker || !tracker.php) {
    done();
    return null;
  }

  return src(tracker.php)
    .pipe(dest(`${dist}/php/`))
  ;
}


/**
 * Copies the fonts.
 */
function cpfonts(done) {
  if (!fonts || !fonts.local || !fonts.local.length) {
    done();
    return null;
  }

  return src(fonts.local)
    .pipe(dest(`${dist}/fonts/`))
  ;
}


/**
 * Copies the images.
 */
function cpimg() {
  return src(img, { base: `${base}/site/.kasar/theme` })
    .pipe(dest(dist))
  ;
}


// Gulp Public Tasks
module.exports = series(
  create,
  parallel(
    cpjs,
    cpminifiedlibs,
    cp2minifylibs,
    cpga,
    cptrackerjs,
    cptrackerphp,
    cpfonts,
    cpimg,
    dohtml5,
    dojs,
    dojsu,
    dosw,
    docss,
    dophp,
  ),
  dopostskeleton,
);
