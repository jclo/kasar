// ESLint declarations:
/* global describe */
/* - */


// -- Vendor Modules


// -- Local Modules
import Kasar from '../index.js';
import pack from '../package.json' with { type: 'json' };
import testlib from './int/lib.js';


// -- Local Constants
const libname = 'Kasar';


// -- Local Variables


// -- Main
describe('Test Kasar:', () => {
  testlib(Kasar, libname, pack.version, 'without new');
});


// - oOo --
