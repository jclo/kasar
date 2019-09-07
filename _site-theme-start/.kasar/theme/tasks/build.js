/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const { series, parallel } = require('gulp')
    ;

// -- Local modules
const removeprevious = require('./remove')
    , doskeleton     = require('./doskeleton')
    , dopages        = require('./dopages')
    , dositemap      = require('./dositemap')
    , cleanup        = require('./cleanup')
    ;


// -- Local constants


// -- Local variables


// -- Gulp Private Tasks


// Gulp Public Tasks
module.exports = series(
  removeprevious, doskeleton,
  parallel(dopages, dositemap),
  cleanup,
);
