// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const { watch, series } = require('gulp')
    , browserSync = require('browser-sync')
    ;


// -- Local modules
const config = require('./theme-config')
    ;

// -- Local constants
const server       = browserSync.create()
    , { base }     = config
    , filesToWatch = [
      `${base}/site/webpages/**/*`, `${base}/site/tobuildweb/**/*`,
      `${base}/site/config.js`,
    ]
    ;

// -- Local variables

// -- Gulp Private Tasks
const build = require('../tasks/build')
    ;


// Reloads the browser after a rebuild.
function reload(done) {
  server.reload();
  done();
}


// Gulp watch
function fwatch() {
  watch(filesToWatch, series(build, reload));
}

// Gulp connect
function serve(done) {
  server.init({
    server: {
      baseDir: '../_dist',
    },
    port: '8080',
  });
  done();
}

// Gulp Public Tasks:
exports.serve = series(build, serve, fwatch);
exports.build = build;
