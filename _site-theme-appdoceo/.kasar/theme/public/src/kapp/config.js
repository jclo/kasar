/** ************************************************************************
 *
 * Configuration file.
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global */
/* - */


// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Public ---------------------------------------------------------------

export default {
  exportname: '{{lib:exportname}}',
  version: '{{lib:version}}',
  anchor: '#app',

  // Default Logger settings.
  logger: {
    level: 'error',
  },

  // Util regex
  regex: {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
};


// -- Export


/* oOo */
