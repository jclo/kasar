// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants
// Number of properties added by your library.
const OWNPROPS = 1
    // , TESTMODE = 0
    ;


// -- Local Variables


// -- Main
module.exports = function(Kasar, libname, version) {
  describe('Kasar introspection:', () => {
    describe('Test the nature of Kasar:', () => {
      it('Expects Kasar to be an object.', () => {
        expect(Kasar).to.be.an('object');
      });

      it(`Expects Kasar to own ${0 + OWNPROPS} properties.`, () => {
        expect(Object.keys(Kasar)).to.be.an('array').that.has.lengthOf(0 + OWNPROPS);
      });
    });


    // -- This section must not be modified --
    // VERSION
    describe('Check the owned generic properties:', () => {
      it(`Expects Kasar to own the property "VERSION" whose value is "${version}".`, () => {
        expect(Kasar).to.own.property('VERSION').that.is.equal(version);
      });
    });


    // -- This section must be adapted --
    // Replace here 'getString' and 'getArray' by the inherited properties
    // added by your library.
    describe('Check the owned specific properties:', () => {
      //
    });
  });
};


// - oOo --
