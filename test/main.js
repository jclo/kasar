// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Vendor Modules


// -- Local Modules
const Kasar  = require('../index')
    , pack    = require('../package.json')
    , testlib = require('./int/lib')
    ;


// -- Local Constants
const libname = 'Kasar';


// -- Local Variables


// -- Main
describe('Test Kasar:', () => {
  testlib(Kasar, libname, pack.version, 'without new');
});


// - oOo --
