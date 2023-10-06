/** ************************************************************************
 *
 * Defines the menus.
 *
 * menus.js is just a collection of links.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Overwritten Public Methods:
 *  . none,
 *
 *
 * Specific Public Methods:
 *  . none,
 *
 *
 *
 * @namespace -
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, import/no-extraneous-dependencies */

'use strict';

// -- Node modules


// -- Local modules
const TLMenu  = require('./topleftmenu')
    , TRMenu = require('./toprightmenu')
    , BOTMenu = require('./botmenu')
    ;


// -- Local constants


// -- Local variables


// -- Public Methods ---------------------------------------------------------
// none,


// -- Export
module.exports = {
  TLMenu,
  TRMenu,
  BOTMenu,
};
